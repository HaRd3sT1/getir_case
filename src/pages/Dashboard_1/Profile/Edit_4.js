import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Input from "../../../components/Items/input"
import Select from "../../../components/Items/select"
import Gender from "../../../components/Items/gender"
import DatePicker from "../../../components/Items/datePicker"
import { ButtonPrimary } from "../../../components/Items/buttons"
import { editFunction4 } from "../../../state/actions/profile"
import { onChange } from "../../../state/actions/form"
import { onChangeCountry } from '../../../state/actions/form';
const Edit_4 = (props) => {
    const { loading, userData, formCitys } = useSelector(
        (state) => ({
            loading: state.dashboard.loading,
            userData: state.auth.userData,
            formCitys: state.form.formCitys ? state.form.formCitys : []
        }), shallowEqual
    );

    const dispatch = useDispatch();
    const onSubmitHandler = (event) => {
        event.preventDefault();
        dispatch(editFunction4());
        props.close()
    };


    useEffect(() => {
        if (userData && userData.meta){
            dispatch(onChange("formHeight", userData.meta.height));
            dispatch(onChange("birthDate", new Date(userData.meta.birtDate.seconds * 1000)))
            dispatch(onChange("formCountry", userData.meta.country))
            dispatch(onChange("formCity", userData.meta.city))
            dispatch(onChange("formGender", userData.meta.gender))
            dispatch(onChange("formZip", userData.meta.zip))
            if (userData.meta.country) {
                dispatch(onChangeCountry("formCountry", userData.meta.country))
            }
        }
        // eslint-disable-next-line
    }, [dispatch]);
    return (
        <div>
            <form>
                <Input name="formPassword" type="text" label="Passwort" />
                <DatePicker name="birthDate" type="text" label="Geburtsdatum" />
                <Gender label="Geschlecht" name="formGender" />

                <Select name="formCountry" label="Land" items={[{ label: "Österreich", value: "at" }, { label: "Deutschland", value: "de" }, { label: "Schweiz", value: "ch" }]} />
                <Select name="formCity" label="Region" items={formCitys} />
                <Input name="formZip" type="text" label="Zip" />
                <ButtonPrimary onClick={onSubmitHandler} classnamess="mt-4" text={"Speichern"} loading={loading ? "true" : ""} disabled={loading} />
            </form>
        </div>
    );
};

export default Edit_4;