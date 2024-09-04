const AutoLink = ({ text }) => {
    const delimiter =
        /((?:https?:\/\/)?(?:(?:[a-z0-9]?(?:[a-z0-9\-]{1,61}[a-z0-9])?\.[^\.|\s])+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_\/~#&=;%+?\-\\(\\)]*)/gi

    return (
        <>
            {text.split(delimiter).map((word) => {
                let match = word.match(delimiter)
                if (match) {
                    let url = match[0]
                    return (
                        <a
                            href={
                                url.startsWith('http') ? url : `https://${url}`
                            }
                            target={'_blank'}
                        >
                            {url}
                        </a>
                    )
                }
                return word
            })}
        </>
    )
}

export default AutoLink
