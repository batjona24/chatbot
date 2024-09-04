import {useSwipeable} from "react-swipeable"
import {useEffect, useState} from "react"
import {createUseStyles} from "react-jss"
import PropTypes from "prop-types"
import cx from "classnames"

const useStyles = createUseStyles(theme => ({
    root: ({swipeDisabledForUser}) => ({
        position: "relative",
        ...(swipeDisabledForUser && {pointerEvents: "none"}),
        "& button": {
            opacity: 0
        },
        "&:hover": {
            "& button": {
                opacity: 1
            }
        }
    }),
    wrapper: ({CarouselHeight}) => ({
        width: "100%",
        height: CarouselHeight,
        overflow: "hidden"
    }),
    container: ({
        imageWidth,
        imagesGap,
        isSliding,
        slidingDuration,
        isChangingPosition,
        direction
    }) => ({
        height: "100%",
        display: "flex",
        gap: imagesGap,
        transition: (
            isSliding
                ? `transform ease-in-out ${slidingDuration}s`
                : "none"
        ),
        transform: (
            isChangingPosition
                ? `translateX(calc(-${imageWidth} - ${imagesGap}))`
                : isSliding
                    ? direction === NEXT
                        ? `translateX(calc(-${imageWidth} - ${imagesGap}))`
                        : "translateX(0)"
                    : "translateX(0)"
        )
    }),
    slot: ({imageWidth}) => ({
        flex: "1 0 100%",
        flexBasis: imageWidth,
    }),
    button: {
        position: "absolute",
        zIndex: 2,
        top: "50%",
        transform: "translateY(-50%)",
        width: "2.5rem",
        height: "2.5rem",
        ...theme.utils.flexbox.center,
        border: "none",
        background: "rgba(0,0,0, 0.1)",
        borderRadius: "0.5rem",
        transition: theme.transition,
        color: theme.palette.common.white,
        fontSize: "1rem",
        "&:hover": {
            background: "rgba(0,0,0, 0.2)"
        },
        "&:focus": {
            outline: 0
        }
    },
    prevButton: {
        left: "1rem"
    },
    nextButton: {
        right: "1rem"
    }
}))

const PREV = "previous"
const NEXT = "next"

const Carousel = ({
    list = [],
    infinite = true,
    slidingDelay = 0,
    slidingDuration = 1,
    slideNextOnTap = true,
    activatingSwipeDistance = 10,
    showButtons = true,
    CarouselHeight = 400,
    imageWidth = "100%",
    imagesGap = "0px",
    autoplay = true,
    autoplayTimeout = 5,
    viewOnly = false,
    className,
    ...rest
}) => {
    const [state, setState] = useState({
        position: 0,
        isChangingPosition: false,
        isSliding: false,
        direction: NEXT
    })
    const swipeDisabledForUser = state.isChangingPosition || state.isSliding

    const classes = useStyles({
        isSliding: state.isSliding,
        direction: state.direction,
        isChangingPosition: state.isChangingPosition,
        slidingDuration,
        CarouselHeight,
        imageWidth,
        imagesGap,
        swipeDisabledForUser
    })

    useEffect(() => {
        if(autoplay) {
            const autoplayInterval = (
                setInterval(() => {
                    onChangeItem(NEXT)
                }, autoplayTimeout * 1000)
            )

            return () => clearInterval(autoplayInterval)
        }
    }, [autoplay, autoplayTimeout, state])

    const onChangeItem = (direction) => {
        switch(direction) {
            case PREV:
                setState(prevState => ({
                    ...prevState,
                    isChangingPosition: true,
                    position: (
                        prevState.position === 0
                            ? list.length - 1
                            : prevState.position - 1
                    )
                }))
                setTimeout(() => {
                    setState(prevState => ({
                        ...prevState,
                        isChangingPosition: false,
                        direction: PREV,
                        isSliding: true
                    }))
                }, slidingDelay * 1000)

                setTimeout(() => {
                    setState(prevState => ({
                        ...prevState,
                        isSliding: false,
                    }))
                }, (slidingDuration * 1000) + (slidingDelay * 1000))

                break
            default:
                setTimeout(() => {
                    setState(prevState => ({
                        ...prevState,
                        direction: NEXT,
                        isSliding: true
                    }))
                }, slidingDelay * 1000)

                setTimeout(() => {
                    setState(prevState => ({
                        ...prevState,
                        isSliding: false,
                        position: (
                            prevState.position === list.length - 1
                                ? 0
                                : prevState.position + 1
                        )
                    }))
                }, (slidingDuration * 1000) + (slidingDelay * 1000))
        }
    }

    const handlers = useSwipeable({
        onSwipedLeft: () => (
            viewOnly
                ? null
                : onChangeItem(NEXT)
        ),
        onSwipedRight: () => (
            viewOnly
                ? null
                : onChangeItem(PREV)
        ),
        onTap: () => (
            slideNextOnTap && !viewOnly
                ? onChangeItem(NEXT)
                : null
        ),
        swipeDuration: 500,
        preventScrollOnSwipe: true,
        trackTouch: true,
        trackMouse: true,
        rotationAngle: 0,
        delta: activatingSwipeDistance
    })

    return (
        <div className={cx(classes.root, className)}>
            <div
                {...handlers}
                {...rest}
            >
                <div className={classes.wrapper}>
                    <div className={classes.container}>
                        {list.map((item, index) => (
                            <div
                                className={classes.slot}
                                style={{
                                    order: (
                                        index - state.position < 0
                                            ? list.length - Math.abs(index - state.position)
                                            : index - state.position
                                    )
                                }}
                                key={index}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {(showButtons && !viewOnly) && (
                <>
                    <button
                        className={cx(classes.button, classes.prevButton)}
                        onClick={() => onChangeItem(PREV)}
                    >
                        ←
                    </button>
                    <button
                        className={cx(classes.button, classes.nextButton)}
                        onClick={() => onChangeItem(NEXT)}
                    >
                        →
                    </button>
                </>
            )}
        </div>
    )
}

export default Carousel

Carousel.propTypes = {
    list: PropTypes.array,
    slidingDelay: PropTypes.number, //seconds
    slidingDuration: PropTypes.number, //seconds
    slideNextOnTap: PropTypes.bool,
    activatingSwipeDistance: PropTypes.number, //px
    showButtons: PropTypes.bool,
    CarouselHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), //e.g. 400 | "400px" | "100%" | "25rem"
    imageWidth: PropTypes.string, //e.g. "320px" | "90%" | "20rem" (unity required)
    imagesGap: PropTypes.string, //e.g. "16px" | "5%" | "1rem" (unity required)
    autoplay: PropTypes.bool,
    autoplayTimeout: PropTypes.number, //seconds
    viewOnly: PropTypes.bool,
    className: PropTypes.any
}