# coding=UTF-8

import os
import numpy as np
import pandas as pd
from datetime import date, datetime
import openpyxl as openpy
import sys


sys.stdout.reconfigure(encoding='utf-8')

escritorios = sys.argv[1]
instituicao = sys.argv[2]
responsavel = sys.argv[3]
categoria = sys.argv[4]
submissao = sys.argv[5]
status = sys.argv[6]
mes = sys.argv[7]
ano = sys.argv[8]
resultado = sys.argv[9]

pd.set_option('display.max_columns', None)

def buscaComplexa(escritorios, instituicoes, responsavel, categoria, submissao, status, mes, ano, resultado):
    arrayEscritorios = escritorios.split(",")
    arrayInstituicoes = instituicoes.split(",")

    format_str = '%d/%m/%Y'
    format_str2 = '%m/%Y'

    filepath = os.path.join('c:/UltimaPlanilha', 'ultima_planilha.txt')

    f = open(filepath, "r")
    w = f.read()

    df = pd.read_excel(w, sheet_name="CATEGORIAS PARA LIPE")


    df['DATA PREVISTA'] = pd.to_datetime(df['DATA PREVISTA'], format="%d/%m/%Y")
    df['DATA RESULTADO'] = pd.to_datetime(df['DATA RESULTADO'], format="%m/%Y")

    if resultado=="previsao":
        if ano != "todos":
            df = df[df['DATA PREVISTA'].map(lambda x: x.month) == int(mes)]

            df = df[df['DATA PREVISTA'].map(lambda x: x.year) == int(ano)]

        else:
            df = df[df['DATA PREVISTA'].map(lambda x: x.month) == int(mes)]

    else:
        if ano != "todos":
            df = df[df['DATA RESULTADO'].map(lambda x: x.month) == int(mes)]

            df = df[df['DATA RESULTADO'].map(lambda x: x.year) == int(ano)]

        else:
            df = df[df['DATA RESULTADO'].map(lambda x: x.month) == int(mes)]


    if arrayInstituicoes[0] != "":
        df = df[df['INSTITUIÇÃO'].isin(arrayInstituicoes)]
    if arrayEscritorios[0] != "":
        print("opa cliente")
        df = df[df['CLIENTE'].isin(arrayEscritorios)]

    # resultadoFinal = df.to_html(index = False)
    # return resultadoFinal
    
    if responsavel!="":
        resp_mask = df['RESPONSÁVEL'] == responsavel
        df = df[resp_mask]
    
    if submissao!="":
        resp_mask = df['FAZ SUBMISSÃO? (S/N)'] == submissao
        df = df[resp_mask]
    
    if status!="":
        resp_mask = df['STATUS'] == status
        df = df[resp_mask]


    df = df.replace(np.nan, '', regex=True)

    resultadoFinal = df.to_html(index = False)
    return resultadoFinal



print(buscaComplexa(escritorios, instituicao, responsavel, categoria,submissao, status, mes, ano, resultado))
sys.stdout.flush()






