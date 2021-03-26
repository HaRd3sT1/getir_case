import React, { useEffect} from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { ButtonPrimary } from "../../../components/Items/buttons"
import { editFunction2 } from "../../../state/actions/profile"
import { onChange } from "../../../state/actions/form"
import Select2 from 'react-select'
const Edit_2 = (props) => {

    const options = [
        { value: 0, label: 'Lesen' },
        { value: 1, label: 'Reisen' },
        { value: 2, label: 'Musik hören' },
        { value: 3, label: 'Kochen' },
        { value: 4, label: 'Schwimmen' },
        { value: 5, label: 'Joggen' },
        { value: 6, label: 'Fitnessstudio' },
        { value: 7, label: 'Reiten' },
        { value: 8, label: 'Kino' },
        { value: 9, label: 'Wandern' },
        { value: 10, label: 'Extermsport' },
        { value: 11, label: 'Fernsehen' },
        { value: 12, label: 'Computerspiele' },
        { value: 13, label: 'Sport' },
        { value: 14, label: 'Fotografie' },
        { value: 15, label: 'Gesellschaftspiele' },
        { value: 16, label: 'Backen' },
        { value: 17, label: 'Sammeln' },
        { value: 18, label: 'Angeln' },
        { value: 19, label: 'Camping' },
        { value: 20, label: 'Karaoke' },
        { value: 21, label: 'Frag mich' }
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
        dispatch(editFunction2());
        props.close()
    };
    let defaultValue = []

    useEffect(() => {
        if (userData.hobs) {
            userData.hobs.forEach(doc => {
                defaultValue.push({
                    value: options[doc] ? options[doc].value : doc,
                    label: options[doc] ? options[doc].label : doc
                })
            })
            dispatch(onChange("formHobs", defaultValue));
        }
        // eslint-disable-next-line
    }, [dispatch]);
    return (
        <div>
            <form>
                <Select2
                    isMulti
                    defaultValue={defaultValue}
                    onChange={(e) => dispatch(onChange("formHobs", e))}
                    options={options} />
                <ButtonPrimary onClick={onSubmitHandler} classnamess="mt-4" text={"Speichern"} loading={loading ? "true" : ""} disabled={loading} />
            </form>
        </div>
    );
};

export default Edit_2;