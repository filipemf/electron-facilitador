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
optionsQ2 = sys.argv[2]

def buscarEscritorios():
    filepath = os.path.join('c:/UltimaPlanilha', 'ultima_planilha.txt')

    f = open(filepath, "r")
    w = f.read()

    df = pd.read_excel(w, sheet_name="CATEGORIAS PARA LIPE")

    dfEscritorios = df.iloc[:,0]
    dfEscritorios = dfEscritorios.dropna()

    escritorios = []
    for row in dfEscritorios:
        if row not in escritorios:
            escritorios.append(row)


    return escritorios


def buscarInsituicoes():
    filepath = os.path.join('c:/UltimaPlanilha', 'ultima_planilha.txt')

    f = open(filepath, "r")
    w = f.read()

    df = pd.read_excel(w, sheet_name="CATEGORIAS PARA LIPE")

    dfInstituicoes = df.iloc[:,1]
    dfInstituicoes = dfInstituicoes.dropna()

    insittuicoes = []
    for row in dfInstituicoes:
        if row not in insittuicoes:
            insittuicoes.append(row)


    return insittuicoes


def fetchEscritorios(escritorios, instituicoes):
    escritoriosArray= escritorios.split(",")
    instituicoesArray= instituicoes.split(",")

    filepath = os.path.join('c:/UltimaPlanilha', 'ultima_planilha.txt')

    f = open(filepath, "r")
    w = f.read()

    df = pd.read_excel(w, sheet_name="CATEGORIAS PARA LIPE")



    todosEscritorios = buscarEscritorios()
    todasInstituicoes = buscarInsituicoes()

    print(escritoriosArray)
    print(instituicoesArray)

    if len(escritoriosArray) != 0:
        print("não é igual")
        if np.array_equal(escritoriosArray, todosEscritorios) == False:
            print(str(len(escritoriosArray)))
            df = df[df['CLIENTE'].isin(escritoriosArray)]

    if len(instituicoesArray) != 0:
        print("não é igual 2")
        if np.array_equal(instituicoesArray, todasInstituicoes) == False:
            print(instituicoesArray[0])
            df = df[df['INSTITUIÇÃO'].isin(instituicoesArray)]

    df = df.replace(np.nan, '', regex=True)

    resultadoFinal = df.to_html(index = False)

    return resultadoFinal



if optionsQ =="escritorios":
    print(buscarEscritorios())
elif optionsQ == "instituicoes":
    print(buscarInsituicoes())
else:
    print(fetchEscritorios(optionsQ, optionsQ2))

sys.stdout.flush()