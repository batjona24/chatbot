import React from "react"
import Divider from "../../../components/Divider"
import Carousel from "../../../components/Carousel"

const CarouselPage = () => {
    const list = [
        <div className="d-flex justify-content-center align-items-center" style={{backgroundColor: "#d9d9d9", height: "100%", fontSize: "10rem"}}>1</div>,
        <div className="d-flex justify-content-center align-items-center" style={{backgroundColor: "#d9d9d9", height: "100%", fontSize: "10rem"}}>2</div>,
        <div className="d-flex justify-content-center align-items-center" style={{backgroundColor: "#d9d9d9", height: "100%", fontSize: "10rem"}}>3</div>,
        <div className="d-flex justify-content-center align-items-center" style={{backgroundColor: "#d9d9d9", height: "100%", fontSize: "10rem"}}>4</div>,
        <div className="d-flex justify-content-center align-items-center" style={{backgroundColor: "#d9d9d9", height: "100%", fontSize: "10rem"}}>5</div>
    ]

    return <>
        <div className="row">
            <div className="col-12 mt-4">
                <h5>Carousel</h5>
                <Divider/>
                <p>
                    desc
                </p>
            </div>
        </div>

        <div className="row mt-4">
            <div className="col-12">
                <Carousel list={list}/>
            </div>
        </div>
        <div className="row my-4">
            <div className="col-12">
                <Carousel
                    list={list}
                    imageWidth="50%"
                    imagesGap="1rem"
                    autoplayTimeout={8}
                    slidingDuration={0.5}
                />
            </div>
        </div>
    </>
}

export default CarouselPage
