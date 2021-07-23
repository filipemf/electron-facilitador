# coding=UTF-8

import os
import numpy as np
import pandas as pd
from datetime import datetime
import openpyxl as openpy
import sys
import json

pd.set_option('display.max_columns', None)

sys.stdout.reconfigure(encoding='utf-8')
# optionsQ = sys.argv[1]

def buscarDado():
    filepath = os.path.join('./UltimaPlanilha', 'ultima_planilha.txt')

    f = open(filepath, "r")
    w = f.read()

    df = pd.read_excel(w, sheet_name="CATEGORIAS PARA LIPE")

    df = df.drop_duplicates(subset=['INSTITUIÇÃO','CATEGORIAS'], keep="first")
    

    dfAndamento = df['CASOS EM ANDAMENTO'].dropna().to_list()
    dfRevisao = df['CASOS EM REVISÃO'].dropna().to_list()
    dfTranscricao = df['CASOS EM TRANSCRIÇÃO'].dropna().to_list()
    dfAprovacao = df['CASOS EM APROVAÇÃO'].dropna().to_list()

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
            }
        }
    ]

    #print(df)
    #list1= df.to_json(orient="values", force_ascii=False)
    #print(data)
    y = json.dumps(data[0])
    return y

print(buscarDado())

sys.stdout.flush()