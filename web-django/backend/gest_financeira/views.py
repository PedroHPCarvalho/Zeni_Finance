import json

from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.db.models import Sum

from .models import Registros
from .gpt_api import go_ia

import pandas as pd
import plotly.express as px
import plotly.offline as opy

# Create your views here.


@login_required(login_url='login')  # redireciona para a rota 'login' se não estiver autenticado
def home(request):
    registros = Registros.objects.filter(id_user=request.user)
    gastos_totais = Registros.objects.filter(id_user=request.user, type_register__iexact='saída').aggregate(total=Sum('amount'))['total'] or 0
    entradas_totais = Registros.objects.filter(id_user=request.user, type_register__iexact='entrada').aggregate(total=Sum('amount'))['total'] or 0
    orcamento_livre = entradas_totais - gastos_totais

    # 'dados' é um queryset, converta para lista de dicionários
    dados_list = Registros.objects.filter(id_user=request.user).values()
    # Crie o DataFrame
    df_dados = pd.DataFrame(dados_list)
    if not df_dados.empty:
        resume_pie = df_dados[["category", "amount", "type_register"]]
        resume_pie = resume_pie[resume_pie['type_register'] != 'entrada']
        resume_pie = resume_pie.groupby("category", as_index=False)['amount'].sum()

        fig = px.pie(
            resume_pie,
            names='category',
            values='amount',
            hole=0.5  # gráfico de rosca
        )
        fig.update_traces(
            textinfo='percent',
            textfont_size=14,
            pull=[0.05 if v == max(resume_pie['amount']) else 0 for v in resume_pie['amount']],
            marker=dict(line=dict(color='white', width=2))
        )
        fig.update_layout(
            title='Gasto por Categoria',
            title_font_size=24,
            title_x=0.5,
            paper_bgcolor='rgba(0,0,0,0)',
            plot_bgcolor='rgba(0,0,0,0)',
            font=dict(color='white', size=16),
            legend=dict(
                orientation='v',
                x=1.1,  # Mais distante horizontalmente
                y=0.5,
                xanchor='left',
                yanchor='middle',
                font=dict(size=14),
                bgcolor='rgba(0,0,0,0)',
                borderwidth=0
            ),
            margin=dict(t=80, b=20, l=20, r=200),  # Mais espaço à direita
            height=550
        )
        
        graf_html = opy.plot(fig, auto_open=False, output_type='div')
    else:
        graf_html = "<div style='color:white'>Nenhum dado para exibir</div>"

    contexto_pag = {
        'registros': registros,
        'gastos_totais': gastos_totais,
        'entradas_totais': entradas_totais,
        'orcamento_livre': orcamento_livre,
        'grafico': graf_html
    }

    return render(request, "gest_financeira/home.html", contexto_pag)


@login_required(login_url='login')  # redireciona para a rota 'login' se não estiver autenticado
def process_chat(request):
    if request.method == "POST":
        mensagem = request.POST.get("mensagem", "")
        response_ia = go_ia(mensagem)
        response_ia_json = response_ia.choices[0].message.content
        if response_ia_json:
            try:
                dados = json.loads(response_ia_json)
            except json.JSONDecodeError:
                dados = {"error": "Resposta da IA não é um JSON válido."}
        else:
            dados = {"error": "Resposta vazia da IA."}

        campos_obrigatorios = ['date', 'amount', 'description', 'category', 'type_register']
        if all(campo in dados and dados[campo] for campo in campos_obrigatorios):
            Registros.objects.create(
                id_user=request.user,
                description=dados['description'],
                category=dados['category'],
                type_register=dados['type_register'],
                amount=dados['amount'],
                date=dados['date']
            )
            return JsonResponse({"mensagem": "Registro inserido com sucesso!", "status": "ok"})
        else:
            return JsonResponse({"mensagem": "Erro: JSON incompleto ou inválido.", "status": "erro"})