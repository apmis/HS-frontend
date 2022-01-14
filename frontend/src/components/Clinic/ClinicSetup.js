/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {toast} from 'bulma-toast'
import DocumentClass from '../EncounterMgt/DocumentClass'


export default function InventorySetup() {
   
    return (
        <section className= "section remPadTop">
            <DocumentClass />

        </section>
    )
}
