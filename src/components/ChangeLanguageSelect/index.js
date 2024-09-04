import useStyles, {getSelectStyle} from "./style"
import {languages, SUCCESS} from "../../utilities/constants/app"
import ReactSelect from "react-select"
import {useTranslation} from "react-i18next"
import {useDispatch} from "react-redux"
import {setAlertMessage} from "../../store/slices/app"
import {useTheme} from "react-jss"
import PropTypes from "prop-types"
import Popover from "../Popover"
import {useState} from "react"
import {CheckIcon, DropdownIcon} from "../../theme/icons"

const ChangeLanguageSelect = ({isModalMenu = false}) => {
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()
    const theme = useTheme()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const options = [
        {label: "English", value: languages.ENGLISH},
        {label: "Italiano", value: languages.ITALIAN}
    ]
    const defaultValue = options.find(option => option.value === i18n.language)
    const style = getSelectStyle(theme)
    const classes = useStyles()

    const onChange = (newLanguage) => {
        i18n.changeLanguage(newLanguage.value, () => {
            dispatch(setAlertMessage({message: t("alerts:language_changed"), variant: SUCCESS}))
        })
    }

    return (
        isModalMenu
            ? (
                <>
                    {isModalOpen && (
                        <Popover
                            bodyClassName={classes.modalBody}
                            title={t("common:change_language")}
                            maxWidth={400}
                            onClose={() => setIsModalOpen(false)}
                        >
                            {options.map(option => {
                                const isSelected = defaultValue.value === option.value

                                return (
                                    <div
                                        className={classes.option}
                                        onClick={() => onChange(option)}
                                        {...(isSelected && {style: {background: theme.palette.grey[300]}})}
                                        key={option.value}
                                    >
                                        <span>{option.label}</span>
                                        {isSelected && <CheckIcon/>}
                                    </div>
                                )
                            })}
                        </Popover>
                    )}
                    <div
                        className={classes.select}
                        onClick={() => setIsModalOpen(true)}
                    >
                        <span>{defaultValue.label}</span>
                        <DropdownIcon/>
                    </div>
                </>
            )
            : (
                <ReactSelect
                    onChange={onChange}
                    options={options}
                    defaultValue={defaultValue}
                    isClearable={false}
                    isSearchable={false}
                    isCreatable={false}
                    menuPosition="absolute"
                    menuPlacement="top"
                    styles={style}
                    components={{DropdownIndicator: () => <DropdownIcon/>}}
                />
            )
    )
}

export default ChangeLanguageSelect

ChangeLanguageSelect.propTypes = {
    isModalMenu: PropTypes.bool
}