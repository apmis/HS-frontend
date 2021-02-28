import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";
//import {useHistory} from 'react-router-dom'
import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'
import { formatDistanceToNowStrict } from 'date-fns'
import VideoConference from '../utils/VideoConference';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
import { PrescriptionList } from '../EncounterMgt/Prescription';

export default function PatientProfile () {
    const {state}=useContext(ObjectContext) //,setState
    // eslint-disable-next-line
    const [selectedClient,setSelectedClient]=useState() 
    const client =state.ClientModule.selectedClient
    const {
        firstname,
        middlename,
        lastname,
        dob,
        gender,
        maritalstatus,
        religion,
        phone,
        email,
        profession,
       
        nok_name,
        nok_phoneno,
        nok_email,
        nok_relationship ,
        bloodgroup,
        genotype,
        disabilities,
        specificDetails,
        clientTags,
        mrn,
        address,
        city,
        lga,
        //state,
        country,
        allergies,
        comorbidities,
        paymentinfo
    } =state.ClientModule.selectedClient 

    const {
        cash,
        cashDetails,
        familycover,
        familyDetails,
        companycover,
        companyDetails,
        hmocover,
        hmoDetails
        } =state.ClientModule.selectedClient.paymentinfo

    useEffect(() => {
        
        return () => {

        }
    }, [])

    useEffect(() => {
      setSelectedClient(state.ClientModule.selectedClient)
       /*  console.log(client)
        console.log(selectedClient) */
        return () => {
            
        }
    })

    return (
        <div>
            <div className="card">
                <div className="card-content p-1">
                    <div className="media p-0 m-0 ">
                        <div className="media-left">
                            <figure className="image is-48x48">
                             <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="title is-7">{firstname} {middlename} {lastname}</p>
                            <p className="subtitle is-7 payment">
                                {cash && "Cash"}
                                {familycover && "Family Cover"}
                                {companycover && "Company Cover"}
                                {hmocover && "HMO Cover"}
                                </p>
                            
                        </div>

                    </div>

                        <div className="content">
                        <time dateTime="2016-1-1"> {formatDistanceToNowStrict(new Date(dob))}</time> { gender} {maritalstatus} {religion} {profession}<br/>
                        {bloodgroup} {genotype} <br/>
                        <strong> {clientTags}</strong>
                       {/*  {phone} {email} */}
                        
                       
                        </div>
                    </div>
                    </div>
                    <div className="card mt-1">
                        <div className="card-content p-1">
                            {/*<div >
                             <label className="label is-size-7">Tags:</label> 
                           <strong> {clientTags}</strong>
                            </div>*/}
                            <div>
                            <label className="label is-size-7">Specific Instructions:</label>
                            {specificDetails}
                            </div>
                            <div >
                            <label className="label is-size-7">Allergies:</label>
                            {allergies}
                            </div>
                            <div>
                            <label className="label is-size-7">Co-morbidities:</label>
                            {comorbidities}
                            </div>
                            <div>
                            <label className="label is-size-7">Disabilities:</label>
                            {disabilities}
                            </div>
                            
                        </div>
                    </div>
                    <div className="card mt-1">
                        <div className="card-content p-1">
                            
                                <div className=" is-fullwidth vscrollable-acc pr-1">   
                                    <Accordion allowZeroExpanded>
                                    <AccordionItem   >
                                            <AccordionItemHeading >
                                                <AccordionItemButton  >
                                                    <strong>  Last Visit </strong>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <><label className="label is-size-7"></label> </>    
                                            </AccordionItemPanel>                                          
                                        </AccordionItem>
                                    <AccordionItem   >
                                            <AccordionItemHeading >
                                                <AccordionItemButton  >
                                                    <strong>  Drug Intolerance  </strong>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <></>    
                                            </AccordionItemPanel>                                          
                                        </AccordionItem>
                                        <AccordionItem   >
                                            <AccordionItemHeading >
                                                <AccordionItemButton  >
                                                    <strong>  Medications  </strong>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel className="mt-1">
                                                <PrescriptionList standalone="true"/>     
                                            </AccordionItemPanel>                                          
                                        </AccordionItem>
                                        <AccordionItem   >
                                            <AccordionItemHeading >
                                                <AccordionItemButton  >
                                                    <strong>  History  </strong>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <></>    
                                            </AccordionItemPanel>                                          
                                        </AccordionItem>
                                        <AccordionItem   >
                                            <AccordionItemHeading >
                                                <AccordionItemButton  >
                                                    <strong>  Problem List  </strong>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <></>    
                                            </AccordionItemPanel>                                          
                                        </AccordionItem>
                                        <AccordionItem   >
                                            <AccordionItemHeading >
                                                <AccordionItemButton  >
                                                    <strong>  Task  </strong>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <></>    
                                            </AccordionItemPanel>                                          
                                        </AccordionItem>
                                        
                                    </Accordion>
                                    </div>                   
                        </div>  
                        </div>
                        <div>                       
                    </div>
                    {/* <VideoConference /> */}
        </div>
    )
}
