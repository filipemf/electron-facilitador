# coding=UTF-8

import os
import numpy as np
import pandas as pd
from datetime import date, datetime
import openpyxl as openpy
import sys


sys.stdout.reconfigure(encoding='utf-8')


pd.set_option('display.max_columns', None)

def buscaComplexa(escritorios, instituicoes, responsavel, categoria, submissao, status, mes, ano, resultado):
    #arrayEscritorios = escritorios.split(",")
    #arrayInstituicoes = instituicoes.split(",")

    format_str = '%d/%m/%Y'
    format_str2 = '%m/%Y'

    filepath = os.path.join('c:/UltimaPlanilha', 'ultima_planilha.txt')

    f = open(filepath, "r")
    w = f.read()

    df = pd.read_excel(w, sheet_name="CATEGORIAS PARA LIPE")


    df['DATA PREVISTA'] = pd.to_datetime(df['DATA PREVISTA'], format="%d/%m/%Y")
    df['DATA RESULTADO'] = pd.to_datetime(df['DATA RESULTADO'], format="%m/%Y")

    if resultado=="previsao":
        print("previsao")
        if ano != "todos":
            nov_mask = df['DATA PREVISTA'].map(lambda x: x.month) == int(mes)

            df2 = df[nov_mask]

            ano_mask = df2['DATA PREVISTA'].map(lambda x: x.year) == int(ano)

            df = df2[ano_mask]

            return df

        else:
            df = df[df['DATA PREVISTA'].map(lambda x: x.month) == int(mes)]

            print(mes)
            # nov_mask = df['DATA PREVISTA'].map(lambda x: x.month) == int(mes)

            # df = df[nov_mask]

            # print(df)

            return df
    else:
        print("resultado")
        if ano != "todos":
            nov_mask = df['DATA RESULTADO'].map(lambda x: x.month) == int(mes)

            df2 = df[nov_mask]

            ano_mask = df2['DATA RESULTADO'].map(lambda x: x.year) == int(ano)

            df = df[ano_mask]

        else:
            nov_mask = df['DATA RESULTADO'].map(lambda x: x.month) == int(mes)

            df = df[nov_mask]

    resultadoFinal = df.to_html(index = False)
    return df

    if arrayInstituicoes[0] != "":
        df = df[df['INSTITUIÇÃO'].isin(arrayInstituicoes)]
    if arrayEscritorios[0] != "":
        df = df[df['CLIENTE'].isin(arrayEscritorios)]

    if responsavel!="":
        resp_mask = df['RESPONSÁVEL'] == responsavel
        df = df[resp_mask]
    
    if submissao!="":
        resp_mask = df['FAZ SUBMISSÃO? (S/N)'] == submissao
        df = df[resp_mask]
    
    if status!="":
        resp_mask = df['STATUS'] == status
        df = df[resp_mask]

    resultadoFinal = df.to_html(index = False)
    return resultadoFinal



print(buscaComplexa(["CM","KGV"], ["CHAMBERS AND PARTNERS","CHAMBERS GLOBAL"], "", "","", "", "5", "todos", "previsao"))
sys.stdout.flush()






