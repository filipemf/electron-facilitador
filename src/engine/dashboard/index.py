# coding=UTF-8

import os
import numpy as np
import pandas as pd
from datetime import datetime
import openpyxl as openpy
import sys

pd.set_option('display.max_columns', None)

sys.stdout.reconfigure(encoding='utf-8')
# optionsQ = sys.argv[1]


def buscarDado(tipo):
    filepath = os.path.join('./UltimaPlanilha', 'ultima_planilha.txt')

    f = open(filepath, "r")
    w = f.read()

    df = pd.read_excel(w, sheet_name="CATEGORIAS PARA LIPE")

    

    df = df.drop_duplicates(subset=['INSTITUIÇÃO','CATEGORIAS'], keep="first")
    

    dfSim = df[df[tipo]=="Sim"]
    dfNao = df[df[tipo]=="Não"]

    dfSim = dfSim[tipo]
    dfNao = dfNao[tipo]

    allResultado = str(len(dfSim.index))+"/"+str(len(dfNao.index))
    #print(df)
    #list1= df.to_json(orient="values", force_ascii=False)

    return allResultado





print(buscarDado("CASOS EM ANDAMENTO"))

sys.stdout.flush()