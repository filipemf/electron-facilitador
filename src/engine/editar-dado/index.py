# coding=UTF-8

import os
import numpy as np
import pandas as pd
from datetime import date, datetime
import openpyxl as openpy
import sys


def checarEscritorios(grupos):
    gruposArray = grupos.split(",")

    instituicoes = grupos.split(':')[0]
    categorias = ': '.join(grupos.split(':')[1:])

    print("INS: "+instituicoes)
    print("Cate: "+categorias)

    
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


print(checarEscritorios("ABRIL:Gfd"))

