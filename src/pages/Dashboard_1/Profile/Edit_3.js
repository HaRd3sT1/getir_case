import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Select from "../../../components/Items/select"
import { ButtonPrimary } from "../../../components/Items/buttons"
import { editFunction3 } from "../../../state/actions/profile"
import { onChange } from "../../../state/actions/form"
import Select2 from 'react-select'
const Edit_3 = (props) => {
    const options = [
        { value: 0, label: 'Feste Beziehung' },
        { value: 1, label: 'Abenteuer' },
        { value: 2, label: 'Affäre' },
        { value: 3, label: 'Flirt' },
        { value: 4, label: 'Freundschaft' }
    ]
    const { loading, userData, form } = useSelector(
        (state) => ({
            loading: state.dashboard.loading,
            userData: state.auth.userData,
            form: state.form,
        }), shallowEqual
    );

    const dispatch = useDispatch();
    const onSubmitHandler = (event) => {
        event.preventDefault();
        dispatch(editFunction3());
        props.close()
    };
    let defaultValue = []

    useEffect(() => {
        if (userData && userData.meta) {
            userData.filter.relation.forEach(doc => {
                defaultValue.push({
                    value: options[doc] ? options[doc].value : doc,
                    label: options[doc] ? options[doc].label : doc
                })
            })
            dispatch(onChange("filterRelation", defaultValue));
            dispatch(onChange("filterAge", userData.filter.age));
            dispatch(onChange("filterGender", userData.filter.gender));
            dispatch(onChange("filterCountry", userData.filter.country));
            dispatch(onChange("filterCity", userData.filter.city));
        }
        // eslint-disable-next-line
    }, [dispatch]);
    return (
        <div>
            <form>
                <Select name="filterGender" label="Interessiert an" items={[{ label: "Weiblich", value: 1 }, { label: "Männlich", value: 0 }]} />
                <p>Auf der Suche nach</p>
                <Select2
                    isMulti
                    defaultValue={defaultValue}
                    onChange={(e) => dispatch(onChange("filterRelation", e))}
                    options={options} />
                <Select name="filterAge" label="Im Alter Von" items={[{ label: "Beliebig", value: "all" }, { label: "18 - 25", value: 0 }, { label: "25 - 35", value: 1 }, { label: "35 - 45", value: 2 }, { label: "45 - 55", value: 3 }, { label: "55 - 65", value: 4 }]} />
                <Select name="filterCountry" label="Land" items={[{ label: "Österreich", value: "at" }, { label: "Deutschland", value: "de" }, { label: "Schweiz", value: "ch" }]} />
                <Select name="filterCity" label="Ort" items={form.filterCitys} />
                <ButtonPrimary onClick={onSubmitHandler} classnamess="mt-4" text={"Speichern"} loading={loading ? "true" : ""} disabled={loading} />
            </form>
        </div>
    );
};

export default Edit_3;