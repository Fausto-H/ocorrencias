export default function OcorrenciaFormField({
    name,
    placeholder,
    value,
    onChange,
    error,
    maxLength,
    required = true
}) {
    return (
        <>
            <input
                className={`oc-input ${error ? "oc-input-invalid" : ""}`.trim()}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                required={required}
            />
            {error && <small className="oc-input-error">{error}</small>}
        </>
    );
}
