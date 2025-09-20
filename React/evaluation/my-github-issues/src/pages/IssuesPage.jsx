import React,{useEffect, useState,useReducer} from "react";
import { useParams } from "react-router-dom";
import IssueCard from '../components/IssueCard'
import FilterControls from '../components/FilterControls'

const initialFilters={status:'open', label:''}

function reducer(state, action){
    switch(action.type){
        case 'SET_STATUS':
            return {...state, status:action.payload}
        case 'SET_LABEL':
            return{...state, label:action.payload}
        default:
            return state        
    }
}

export default function IssuesPage(){
    const {owner, repoName}=useParams()
    const [issues, setIssues]=useState([])
    const [loading, setLoading]=useState(false)
    const [error, setError]= useState(null)
    const [filters, dispatch]=useReducer(reducer, initialFilters)

    useEffect(()=>{
        async function fetchIssues() {
            setLoading(true)
            setError(null)
            try{
                const qs=new URLSearchParams()
                qs.set('per_page', '100')
                if(filters.status) qs.set('state', filters.status)
                if(filters.label) qs.set('labels', filters.label)
                    
                const url= `https://api.github.com/repos/${owner}/${repoName}/issues?${qs.toString()}`
                const headers={}
                const tokens= import.meta.env.VITE_GITHUB_TOKEN
                if(token) headers.Authorization = `token ${token}`
                
                const res= await fetch(url, {headers})
                if(!res.ok){
                    throw new Error(`Github Api error ${res.status}`)
                }
                const data=await res.json()
                const onlyIssues= data.filter(item=> !item.pull_request)
                setIssues(onlyIssues)
            }catch(err){
                setError(err.message)
            }finally{
                setLoading(false)
            }
        }
        fetchIssues()
    },[owner, repoName, filters.status, filters.label])

    return(
        <div style={{maxWidth: 1000, margin:'0 auto'}}>
            <h2>{owner}/{repoName}- Issues</h2>
            <FilterControls filters={filters} dispatch={dispatch} />
            {loading && <p> Loading issues...</p>}
            {error && <p style={{color:'red'}}>Error : {error}</p>}

            <div style={{display:'grid', gap:12, marginTop: 12}}>
                {issues.map(issue=> <IssueCard key={issue.id} issue={issue} />)}
            </div>
        </div>
    )
}