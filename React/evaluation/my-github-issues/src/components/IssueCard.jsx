import React from "react";
export default function IssueCard({issue}){
    return(
        <div style={{padding: 12, border: '1px solid #ddd', borderRadius: 6}}>
            <h3>
                <a href="{issue.html.url}" target="_blank" rel="noreferrer">{issue.title}</a>
            </h3>
            <p>
                #{issue.number} opened by {issue.user?.Login}
            </p>

            <div>
                {IssuesPage.labels.map(lbl=>(
                    <span
                    key={lbl.id}>
                        {lbl.name}
                    </span>
                ))}
            </div>
        </div>
    )
}