import React, { useEffect} from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Select from "../../../components/Items/select"
import { ButtonPrimary } from "../../../components/Items/buttons"
import { editFunction1 } from "../../../state/actions/profile"
import { onChange } from "../../../state/actions/form"
const Edit_1 = (props) => {
    const { loading, userData } = useSelector(
        (state) => ({
            loading: state.dashboard.loading,
            userData: state.auth.userData,
        }), shallowEqual
    );

    const dispatch = useDispatch();
    const onSubmitHandler = (event) => {
        event.preventDefault();
        dispatch(editFunction1());
        props.close()
    };


    useEffect(() => {
        if (userData && userData.meta){
            dispatch(onChange("formHeight", userData.meta.height));
            dispatch(onChange("formBody", userData.meta.body))
            dispatch(onChange("formEyeColor", userData.meta.eyeColor))
            dispatch(onChange("formHairColor", userData.meta.hairColor))
            dispatch(onChange("formStyle", userData.meta.style))
            dispatch(onChange("formExtra", userData.meta.extra))
        }
        // eslint-disable-next-line
    }, [dispatch]);
    return (
        <div>
            <form>
                <Select name="formHeight" label="Größe" items={[{ label: "1,50", value: "1,50" }, { label: "1,51", value: "1,51" }, { label: "1,52", value: "1,52" }, { label: "1,53", value: "1,53" }, { label: "1,54", value: "1,54" }, { label: "1,55", value: "1,55" }, { label: "1,56", value: "1,56" }, { label: "1,57", value: "1,57" }, { label: "1,58", value: "1,58" }, { label: "1,59", value: "1,59" }, { label: "1,60", value: "1,60" }, { label: "1,61", value: "1,61" }, { label: "1,62", value: "1,62" }, { label: "1,63", value: "1,63" }, { label: "1,64", value: "1,64" }, { label: "1,65", value: "1,65" }, { label: "1,66", value: "1,66" }, { label: "1,67", value: "1,67" }, { label: "1,68", value: "1,68" }, { label: "1,69", value: "1,69" }, { label: "1,70", value: "1,70" }, { label: "1,71", value: "1,71" }, { label: "1,72", value: "1,72" }, { label: "1,73", value: "1,73" }, { label: "1,74", value: "1,74" }, { label: "1,75", value: "1,75" }, { label: "1,76", value: "1,76" }, { label: "1,77", value: "1,77" }, { label: "1,78", value: "1,78" }, { label: "1,79", value: "1,79" }, { label: "1,80", value: "1,80" }, { label: "1,81", value: "1,81" }, { label: "1,82", value: "1,82" }, { label: "1,83", value: "1,83" }, { label: "1,84", value: "1,84" }, { label: "1,85", value: "1,85" }, { label: "1,86", value: "1,86" }, { label: "1,87", value: "1,87" }, { label: "1,88", value: "1,88" }, { label: "1,89", value: "1,89" }, { label: "1,90", value: "1,90" }, { label: "1,91", value: "1,91" }, { label: "1,92", value: "1,92" }, { label: "1,93", value: "1,93" }, { label: "1,94", value: "1,94" }, { label: "1,95", value: "1,95" }, { label: "1,96", value: "1,96" }, { label: "1,97", value: "1,97" }, { label: "1,98", value: "1,98" }, { label: "1,99", value: "1,99" }, { label: "2,00", value: "2,00" }]} />

                <Select name="formBody" label="Statur" items={[{ label: "Schlank", value: "Schlank" }, { label: "Normal", value: "Normal" }, { label: "Athletisch", value: "Athletisch" }, { label: "Muskulös", value: "Muskulös" }, { label: "Mollig", value: "Schlank" }]} />

                <Select name="formEyeColor" label="Augenfarbe" items={[{ label: "Blau", value: "Blau" }, { label: "Braun", value: "Braun" }, { label: "Grün", value: "Grün" }, { label: "Grau", value: "Grau" }]} />

                <Select name="formHairColor" label="Haarfarbe" items={[{ label: "Blond", value: "Blond" }, { label: "Schwarz", value: "Schwarz" }, { label: "Rot", value: "Rot" }, { label: "Braun", value: "Braun" }, { label: "Weiß", value: "Weiß" }, { label: "Weitere", value: "Weitere" }]} />

                <Select name="formStyle" label="Style" items={[{ label: "Sportlich", value: "Sportlich" }, { label: "Klassich", value: "Klassich" }, { label: "Lässig", value: "Lässig" }, { label: "Alternativ", value: "Alternativ" }]} />

                <Select name="formExtra" label="Tattoo, Piercing" items={[{ label: "Tattoo", value: "Tattoo" }, { label: "Piercing", value: "Piercing" }, { label: "Beides", value: "Beides" }, { label: "Nichts", value: "Nichts" }]} />
                <ButtonPrimary onClick={onSubmitHandler} classnamess="mt-4" text={"Speichern"} loading={loading ? "true" : ""} disabled={loading} />
            </form>
        </div>
    );
};

export default Edit_1;