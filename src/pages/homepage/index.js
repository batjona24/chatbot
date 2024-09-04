import React from 'react'
import Divider from "../../components/Divider";
import {Link} from "react-router-dom";

const Homepage = () => {

    return <>
        <div className="row">
            <div className="col-12 mt-4">
                <h5>General Structure</h5>
                <Divider/>
                <p>
                    Lo starter è stato creato con Create React app e successivamente adattato alla nostra struttura di
                    base:
                    <code>
                        <br/>
                        - src <br/>
                        |- assets <br/>
                        |- components <br/>
                        |- containers <br/>
                        |- hooks <br/>
                        |- route-guards <br/>
                        |- store <br/>
                        |- theme <br/>
                        |- translations <br/>
                        |- utilities <br/>
                    </code>
                </p>
                <br/>
                <p> L'installazione di base prevede i paccehtti ormai must del nostro stack
                    <code> React Router v6</code>, <code> React Hook form 7</code>, <code> Redux</code>, <code> Bootstrap
                        only grid system</code>,
                    <code> Axios</code>, <code> React Select</code>, <code> dayjs</code>, <code> react jss</code>.
                </p>
                <p>
                    Prima di spiegare dettagliatamente il contenuto dell cartelle vorrei citare 2 dei file più
                    importanti all interno della cartella <code> src </code>
                    il file contenente le configurazioni della libreria di traduzione <code>i18n.js</code>, ed il
                    file <code> routes.js </code> che contiene la nuova struttura per la gestine del routing.
                </p>
            </div>

            <div className={"col-12"}>
                <Divider/>
                <h5> Assets </h5>
                <p> In questa cartella troviamo suddivisi per sottocartelle rappresentanti le pagine tutti i file come
                    img e
                    video che vengono richiamati ed utilizzati all'interno delle stesse</p>

                <Divider/>
                <h5> Componets </h5>
                <p> Qui troviamo tutti qui componenti comuni al proj. Per componente comune intendiamo un unità atomica
                    dei
                    componenti che rappresenta un elemento della ui comune a molte pagine o componenti più grandi.</p>

                <Divider/>
                <h5> Containers </h5>
                <p> Questa cartella continene due componenti wrapper layout. Essi rappresentano la struttura esterna di
                    base di ogni pagina, con componenti comuni alla navigazione. Essi si dividono in private e
                    public, esprimono due diversi layout che garantiscono diverse visualizzazioni in base ai
                    permessi. </p>

                <Divider/>
                <h5> Hooks </h5>
                <p> In questa cartella andremo ad inserire i custom hooks che ci troveremo a scrivere ed utilizzare
                    durante il progetto.</p>

                <Divider/>
                <h5> Http Requests </h5>
                <p> Qui come da titolo avremo divise per cartelle inerenti alle sezioni dell'applicativo, la definizione
                    delle api call con axios. </p>

                <Divider/>
                <h5> Pages </h5>
                <p> Le pagine dell applicativo sono raccolte qui nelle omonime cartelle. Esse conterranno un
                    file <code>index.js</code> che sarà il main della pagina , ed altre cartelle che andranno ad
                    identificare i macro componenti che la compongono.</p>
                <p> Eccezzione per le pagine relative al modulo di authenticazione che sono raccolte a loro volta nella
                    cartella authentication. </p>

                <Divider/>
                <h5> Route guards </h5>
                <p> Similmente a quanto visto nella cartella containers, qui troviamo la suddivisione in privte e
                    public. Essi sono due tipi di wrapper di navigazione, attraverso i quali gestiiamo il redirect e la
                    permanenza dell'utente in una view.</p>

                <Divider/>
                <h5> Store </h5>
                <p> Lo stato interno dell'applicazione come di consueto è gestito con redux. Nella nostra gestione di
                    redux ottimizzata utilizziamo slice, AsyncThunk, e CreateSelector ai fini di ottimizzare il
                    codice. ref: <Link to={"https://redux.js.org/introduction/why-rtk-is-redux-today"}
                                       target={"_blank"}> Why Redux Toolkit is How To Use Redux Today? </Link>
                </p>

                <Divider/>
                <h5> Theme </h5>
                <p> Qui organizziamo il fulcro dello stile dell'intera applicazione. troviamo file che racchiudono le
                    palette, i colori, le dichiarazioni dei font i reset e nel file <code>index.js</code>
                    dove configuriamo il nostro theme in jss e definiamo centralizzando lo stile dell'intera
                    applicazione. ref: <Link to={"https://cssinjs.org/react-jss/?v=v10.9.1-alpha.2"}
                                             target={"_blank"}> Why Redux Toolkit is How To Use Redux Today? </Link>
                </p>

                <Divider/>
                <h5> Translations </h5>
                <p> In questa folder sono raccolte le traduzione nei file json. La suddivisione è per cartella
                    identificante la lingua. All'interno di essa i file json sono divisi per pagina
                    ref: <Link to={"https://www.i18next.com/overview/getting-started"}
                               target={"_blank"}> i18next docs </Link>
                </p>

                <Divider/>
                <h5> Utilities </h5>
                <p></p>
            </div>
        </div>
    </>
}

export default Homepage
