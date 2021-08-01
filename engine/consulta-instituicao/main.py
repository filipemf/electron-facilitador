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
optionsQ3 = sys.argv[3]

def buscarEscritorios():
    filepath = os.path.join('./UltimaPlanilha', 'ultima_planilha.txt')

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


def buscarCategorias(grupos):
    filepath = os.path.join('./UltimaPlanilha', 'ultima_planilha.txt')

    options = grupos.split(",")
    f = open(filepath, "r")
    w = f.read()

    df = pd.read_excel(w, sheet_name="CATEGORIAS PARA LIPE")

    

    dfCategorias = df[df['INSTITUIÇÃO'].isin(options)]
    
    dfCategorias = dfCategorias[['INSTITUIÇÃO','CATEGORIAS']]
    
    dfCategorias = dfCategorias.drop_duplicates(subset=['INSTITUIÇÃO','CATEGORIAS'], keep="first")
    dfCategorias = dfCategorias.dropna()

    list1= dfCategorias.to_json(orient="values", force_ascii=False)

    return list1



def buscarInsituicoes():
    filepath = os.path.join('./UltimaPlanilha', 'ultima_planilha.txt')

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


def fetchCategorias(escritorios, instituicoes, categorias):
    escritoriosArray= escritorios.split(",")
    instituicoesArray= instituicoes.split(",")
    categoriasArray = categorias.split(",")

    filepath = os.path.join('./UltimaPlanilha', 'ultima_planilha.txt')

    f = open(filepath, "r")
    w = f.read()

    df = pd.read_excel(w, sheet_name="CATEGORIAS PARA LIPE")



    todosEscritorios = buscarEscritorios()
    todasInstituicoes = buscarInsituicoes()


    # if len(escritoriosArray) != 0:
    #     print("não é igual")
    #     if np.array_equal(escritoriosArray, todosEscritorios) == False:
    #         print(str(len(escritoriosArray)))
    #         df = df[df['CLIENTE'].isin(escritoriosArray)]

    # if len(instituicoesArray) != 0:
    #     print("não é igual 2")
    #     if np.array_equal(instituicoesArray, todasInstituicoes) == False:
    #         df = df[df['INSTITUIÇÃO'].isin(instituicoesArray)]
    df = df[df['CATEGORIAS'].isin(categoriasArray)]
    df = df[df['CLIENTE'].isin(escritoriosArray)]
    df = df[df['INSTITUIÇÃO'].isin(instituicoesArray)]
    
     

    df = df.replace(np.nan, '', regex=True)

    resultadoFinal = df.to_html(index = False)

    return resultadoFinal



if optionsQ =="grupos":
    print(buscarCategorias(optionsQ2))
else:
    print(fetchCategorias(optionsQ, optionsQ2, optionsQ3))

sys.stdout.flush()