from flask import Flask, request, jsonify
from flask_cors import CORS

import re
import math
import numpy as np
import pandas as pd
from datetime import datetime
from numpy import sin, cos, arccos, pi, round

app = Flask(__name__)
CORS(app)  # Habilitar CORS para toda la aplicación

##################### Estrcutura para una lista doblemente ligada, para la determinacion del segmento y sus funciones #############################
class Node():
    def __init__(self,estacion : str,distancia : float,factor : float,segmento : int):
        self.estacion : str = estacion
        self.ditancia : float = distancia
        self.factnext : float = factor
        self.segmento : int = segmento
        self.next : Node = None
        self.prev : Node = None

class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None

    def append(self, estacion : str,distancia : float,factor : float,segmento : int):
        new_node = Node(estacion,distancia,factor,segmento)
        if not self.head:
            self.head = new_node
            self.tail = new_node
        else:
            new_node.prev = self.tail
            self.tail.next = new_node
            self.tail = new_node

    def prepend(self, estacion : str,distancia : float,factor : float,segmento : int):
        new_node = Node(estacion,distancia,factor,segmento)
        if not self.head:
            self.head = new_node
            self.tail = new_node
        else:
            new_node.next = self.head
            self.head.prev = new_node
            self.head = new_node
    
    def display_forward(self):
        current = self.head
        while current:
            print("Estación_",current.estacion, "--Distancia del segmento en metros_", current.ditancia, "--Variable multiplicadora_", current.factnext, "--Segmento_", current.segmento, end=" <-> ")
            current = current.next
        print("None")

    def display_backward(self):
        current = self.tail
        while current:
            print(current.estacion, "-", current.factnext, end=" <-> ")
            current = current.prev
        print("None")
    
    def first_node(self):
        current = self.head
        return current
    
    def last_node(self):
        current = self.tail
        return current

    def find_station(self, prevstation):
        current = self.head
        while current:
            if current.estacion == prevstation:
                return current
            else:
                current = current.next

    def find_segment(self, segmento,num):
        if num<7:
            current = self.head
            while current:
                if current.segmento == segmento:
                    return current
                else:
                    current = current.next
        else:
            current = self.tail
            while current:
                if current.segmento == segmento:
                    return current
                else:
                    current = current.prev
############################################################ Final de la estructura ################################################################    

def rad2deg(radians):
    degrees = radians * 180 / pi
    return degrees
def deg2rad(degrees):
    radians = degrees * pi / 180
    return radians
def distance_between_stops(point1, point2):
    theta = float(point1[2]) - point2[2]
    distance = 60 * 1.1515 * rad2deg(
        arccos(
            (sin(deg2rad(float(point1[1]))) * sin(deg2rad(point2[1]))) + 
            (cos(deg2rad(float(point1[1]))) * cos(deg2rad(point2[1])) * cos(deg2rad(theta)))
        )
    )
    return round(distance * 1.609344, 2)*1000

def calculate_min_num(data):
    min = 9999.00
    index = 0
    for indice,val in enumerate(data):
        if min > val:
            min = val
            index = indice
    return index

def determinate_a_segment(current : Node, distprev : float, distnext : float, estactual : int):
    stade = num_min_between_2num(current.prev.factnext, current.factnext, distprev, distnext)
    if stade == 1:
        return (estactual)
    else:
        return (estactual+1)
    
def num_min_between_2num(previo : float, actual : float, distprev : float, distnext : float):
    num1 = previo * distprev
    num2 = actual * distnext
    if(num1 < num2):
        return 1
    else:
        return 2
############################################################ Final de funciones ################################################################

@app.route('/calculate', methods=['POST'])

def calculate():

    
    DataFrameEst = pd.read_csv("estaciones.csv")
    DataFrameDisSeg = pd.read_csv("sampleseg.csv")
    estaciones = DataFrameEst.to_numpy()
    DataFrameDataSeg = pd.read_csv("Tiempos_prom_segmentos.csv")

    ###########################################################
    ###########################################################
    ###########################################################
    ###########################################################
    #
    coorIda = np.array([[19.343755, -99.140942],[19.340466, -99.143315],[19.335252, -99.141714],[19.331289, -99.140479],[19.327126, -99.139202],[19.323291, -99.138000],[19.317468, -99.138935],[19.312126, -99.140731],[19.306799, -99.143373],[19.301490, -99.147317],[19.297036, -99.150707],[19.288537, -99.146553],[19.282522, -99.139462],[19.279302, -99.132932],[19.267751, -99.125296],[19.264078, -99.117910],[19.260532, -99.110857]])
    coorVue = np.array([[19.341409, -99.143613],[19.336190, -99.142002],[19.332232, -99.140757],[19.327945, -99.139457],[19.324210, -99.138286],[19.318348, -99.138627],[19.313006, -99.140429],[19.307623, -99.142743],[19.302194, -99.146757],[19.297790, -99.150705],[19.289052, -99.147132],[19.282933, -99.139929],[19.279835, -99.133534],[19.268160, -99.126064],[19.264367, -99.118503],[19.260967, -99.111656],[19.259519, -99.108268]])
    #
    ###########################################################
    ###########################################################
    ###########################################################
    ###########################################################


    aux = ""
    SegmentStops = np.array([['Segmento','Entre Estaciones','Distancia en m']])
    for indice, val in enumerate(estaciones):
        if indice == 0:
            aux = val
        else:
            SegmentStops = np.append(SegmentStops, ([[indice,aux[0]+ " - "+val[0], distance_between_stops(aux,val)]]), axis=0)
            aux = val   
    SegmentStops = np.delete(SegmentStops,0,0)
    aux = np.asanyarray(SegmentStops[:,2],dtype=float)
    Stopstam = SegmentStops.shape[0]
    media = math.trunc(aux.mean()) #Cambio el 15/10/2023
    nodosSeg = DoublyLinkedList()
    for i in range(0, Stopstam):
        nodosSeg.append(estaciones[i][0],aux[i],(media/aux[i]),i+1)
        #print(estaciones[i][0])
    nodosSeg.append(estaciones[17][0],media,0,17)
    
    data = request.get_json()
    var1 = data['EstacionDePartida']
    var2 = data['Sentido']

    print("\n\nEstación de partida:",var1)
    print("Sentido del Tren:",var2)

    if(var1 == "Tasqueña"):
        idTren = "M010-I"
        coor = coorIda[0]
        segmento = nodosSeg.find_station(var1).segmento
        estnext = nodosSeg.find_station(var1).next.estacion
    elif(var1 == "Xochimilco"):
        idTren = "M010-V"
        coor = coorVue[16]
        segmento = nodosSeg.find_station(var1).segmento
        estnext = nodosSeg.find_station(var1).prev.estacion
    else:
        if(var2 == "IDA"):
            idTren = "M010-I"
            coor = coorIda[nodosSeg.find_station(var1).segmento - 1]
            segmento = nodosSeg.find_station(var1).segmento
            estnext = nodosSeg.find_station(var1).next.estacion
        else:
            idTren = "M010-V"
            coor = coorVue[nodosSeg.find_station(var1).segmento-2]
            segmento = nodosSeg.find_station(var1).segmento - 1
            estnext = nodosSeg.find_station(var1).prev.estacion
    
    print("Segmento:", segmento)
    print("Estación siguiente:", estnext)

    auxx = np.array(0)
    latTren = coor[0]
    lonTren = coor[1]
    vall = np.array([idTren,latTren,lonTren])
    distests = np.array([])
    segmento = 0
    for val in estaciones:
        distests = np.append(distests,distance_between_stops(vall,val))
    estpiv = calculate_min_num(distests)
    if(estpiv == 0) | (estpiv == 17):
        if estpiv == 0:
            estpiv = 1
        segmento = estpiv
    else:
        #print(distests)
        nodoest = nodosSeg.find_station(estaciones[estpiv][0])
        segmento = determinate_a_segment(nodoest,distests[estpiv-1],distests[estpiv+1],estpiv)
    #print(estpiv,"-",segmento)

    ####### Determinar el sentido del Tren y la distancia recorrida del segmento #######
    segTime = DataFrameDataSeg[DataFrameDataSeg["Numero de Segmento"]==segmento].to_numpy()[0,2]
    """
    velTime = DataFrameDataSeg[DataFrameDataSeg["Numero de Segmento"]==segmento].to_numpy()[0,4] * (5/18)
    distrec = 0
    sentido = idTren.split("-")
    estnext = 0
    if(sentido[1] == "I"):
        if(estpiv == segmento):
            distrec = distests[estpiv-1]
            estnext = estpiv
        else:
            distrec = distests[estpiv]
            estnext = estpiv-1
    else:
        if(estpiv == segmento):
            distrec = distests[estpiv]
            estnext = estpiv-1
        else:
            distrec = distests[estpiv-1]
            estnext = estpiv      
    """

    ####### Calculo del tiempo estimado #######

    #TimeEstimatedF1 = segTime - (distrec/velTime)
    TimeEstimated = segTime

    print("Tiempo estimado",TimeEstimated,"\n")

    #nodosSeg.display_forward()

    result_var1 = estnext
    result_var2 = TimeEstimated
    result_var3 = np.array(coor).tolist()


    response_data = {
        'estNext': result_var1,
        'timEst': "{:.4f}".format(result_var2),
        'coor': result_var3
    }
    
    return jsonify(response_data)

if __name__ == '__main__':
    app.run()