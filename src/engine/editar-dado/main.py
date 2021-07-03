# coding=UTF-8

import os
import numpy as np
import pandas as pd
from datetime import date, datetime
import openpyxl as openpy
import sys


sys.stdout.reconfigure(encoding='utf-8')

def checarEscritorios(grupos):
    gruposArray = grupos.split(",")

    instituicoes = gruposArray[0].split(':')[0]
    categorias = ': '.join(gruposArray[0].split(':')[1:])

    
    filepath = os.path.join('c:/UltimaPlanilha', 'ultima_planilha.txt')

    f = open(filepath, "r")
    w = f.read()

    
    df = pd.read_excel(w, sheet_name="CATEGORIAS PARA LIPE")

    
    df2 = df[df['INSTITUIÇÃO']==instituicoes]

    df2 = df2[df2['CATEGORIAS']==categorias]



    df3 = df2.iloc[:, 0]

    onlyClientes = []
    for item in df3:
        onlyClientes.append(item)

    #onlyClientes.append('Todos')
    return onlyClientes

def buscarDados(grupos, escritorio):
    gruposArray = grupos.split(",")

    instituicoes = gruposArray[0].split(':')[0]
    categorias = ': '.join(gruposArray[0].split(':')[1:])

    
    filepath = os.path.join('c:/UltimaPlanilha', 'ultima_planilha.txt')

    f = open(filepath, "r")
    w = f.read()

    
    df = pd.read_excel(w, sheet_name="CATEGORIAS PARA LIPE")

    
    df2 = df[df['INSTITUIÇÃO']==instituicoes]

    df2 = df2[df2['CATEGORIAS']==categorias]

    df2 = df2[df2['CLIENTE']==escritorio]

    df2 = df2.replace(np.nan, '', regex=True)
    # df3 = df2.iloc[:, 0]

    # onlyClientes = []
    # for item in df3:
    #     onlyClientes.append(item)

    #onlyClientes.append('Todos')
    list1 = df2.to_json(orient="values", force_ascii=False)

    return list1


if sys.argv[1]=="checar-escritorios":
    print(checarEscritorios(sys.argv[2]))
else:
    print(buscarDados(sys.argv[2], sys.argv[3]))


sys.stdout.flush()