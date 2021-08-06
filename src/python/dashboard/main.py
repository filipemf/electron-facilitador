# coding=UTF-8

import os
import pandas as pd
import sys
import json

pd.set_option('display.max_columns', None)

sys.stdout.reconfigure(encoding='utf-8')
# optionsQ = sys.argv[1]


def buscarResponsaveis():
    filepath = os.path.join('./UltimaPlanilha', 'ultima_planilha.txt')

    f = open(filepath, "r")
    w = f.read()

    df = pd.read_excel(w, sheet_name="CATEGORIAS PARA LIPE")

    dfResponsaveis = df.iloc[:,6]
    dfResponsaveis = dfResponsaveis.dropna()

    responsaveis = []
    for row in dfResponsaveis:
        if row not in responsaveis:
            responsaveis.append(row)


    return responsaveis

def buscarDado():
    filepath = os.path.join('./UltimaPlanilha', 'ultima_planilha.txt')

    f = open(filepath, "r")
    w = f.read()

    df = pd.read_excel(w, sheet_name="CATEGORIAS PARA LIPE")
    df2 = pd.read_excel(w, sheet_name="CATEGORIAS PARA LIPE")
    

    dfAndamento = df['CASOS EM ANDAMENTO'].dropna().to_list()
    dfRevisao = df['CASOS EM REVISÃO'].dropna().to_list()
    dfTranscricao = df['CASOS EM TRANSCRIÇÃO'].dropna().to_list()
    dfAprovacao = df['CASOS EM APROVAÇÃO'].dropna().to_list()

    responsaveis = buscarResponsaveis()
    dfResponsaveis = df2['RESPONSÁVEL'].dropna().to_list()


    data = [
        {
            "casos-andamento":{
                "sim":dfAndamento.count("Sim"),
                "nao":dfAndamento.count("Não")
            },
            "casos-revisao":{
                "sim":dfRevisao.count("Sim"),
                "nao":dfRevisao.count("Não")
            },
            "casos-transcricao":{
                "sim":dfTranscricao.count("Sim"),
                "nao":dfTranscricao.count("Não")
            },
            "casos-aprovacao":{
                "sim":dfAprovacao.count("Sim"),
                "nao":dfAprovacao.count("Não")
            },
            "responsaveis":{}
        }
    ]

    for pessoa in responsaveis:
        data[0]["responsaveis"][pessoa]=dfResponsaveis.count(pessoa)
        # data[0].update({"responsaveis":{pessoa:"pessoa"}})

    #print(df)
    #list1= df.to_json(orient="values", force_ascii=False)
    #print(data)
    y = json.dumps(data[0])
    return y

print(buscarDado())

sys.stdout.flush()