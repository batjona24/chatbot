import React from 'react'
import Divider from "../../../components/Divider";

const Typography = () => {
    return <>
        <div className="row">
            <div className="col-11 mt-4">
                <h5>Typography</h5>
                <Divider/>
                <p>Qui troviamo la gestione della tipografia per i nostri proj react. Il tutto è centralizzato all
                    interno del file <code> typography.js </code> nella cartella theme. I font sono importati con
                    fontsource. Nel file <code>index.js</code> del theme, li troviamo richiamati. Modificando questi 2
                    file possiamo adattare a piacimento la tipografia del sito.
                </p>
            </div>
        </div>

        <div className="row mt-5 mb-5">
            <div className="col-12">
                <h1> Heading 1 </h1>
                <h2> Heading 2 </h2>
                <h3> Heading 3 </h3>
                <h4> Heading 4 </h4>
                <h5> Heading 5 </h5>
                <h6> Heading 6 </h6>
                <p> paragraph </p>
                <span className="d-block"> span </span>
                <small> small </small>
            </div>
        </div>
    </>
}

export default Typography
