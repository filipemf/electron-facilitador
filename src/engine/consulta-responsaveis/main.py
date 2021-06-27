# coding=UTF-8

import os
import numpy as np
import pandas as pd
from datetime import datetime
import openpyxl as openpy
import sys

pd.set_option('display.max_columns', None)

sys.stdout.reconfigure(encoding='utf-8')
optionsQ = sys.argv[1]


def buscarResponsaveis():
    filepath = os.path.join('c:/UltimaPlanilha', 'ultima_planilha.txt')

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

def fetchResponsaveis(responsavel):
    filepath = os.path.join('c:/UltimaPlanilha', 'ultima_planilha.txt')

    f = open(filepath, "r")
    w = f.read()

    df = pd.read_excel(w, sheet_name="CATEGORIAS PARA LIPE")

    resp_mask = df['RESPONSÁVEL'] == responsavel

    df2 = df[resp_mask]

    df2 = df2.replace(np.nan, '', regex=True)

    resultadoFinal = df2.to_html(index = False)

        
    return resultadoFinal

    

    # for data in resultadoFinal:
    #     encoded.append(data.encode(encoding="ascii",errors="xmlcharrefreplace"))
    # return encoded
    # filepath = os.path.join('c:/UltimaPlanilha', 'ultima_planilha.txt')

    # f = open(filepath, "r")
    # w = f.read()

    # df = pd.read_excel(w, sheet_name="CATEGORIAS PARA LIPE")

    # resp_mask = df['RESPONSÁVEL'] == responsavel

    # df2 = df[resp_mask]

    # df2 = df2.replace(np.nan, '', regex=True)

    # resultadoFinal = df2.to_html(index = False)
    # return resultadoFinal


if optionsQ =="options":
    print(buscarResponsaveis())
else:
    print(fetchResponsaveis(optionsQ))

sys.stdout.flush()