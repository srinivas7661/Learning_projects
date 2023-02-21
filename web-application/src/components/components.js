export const OtpFormComponent = ({ onChange, value }) => {
  function handleChange(target) {
    onChange(target.name, target.value);
    if (target.nextSibling && target.value) target.nextSibling.focus();
  }

  function inputFocus(elmnt) {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 1;
      if (next > -1) {
        elmnt.target.form[next].focus();
      }
    } else {
      const next = elmnt.target.tabIndex;
      if (next < 6) {
        elmnt.target.form[next].focus();
      }
    }
  }

  return (
    <OtpForm onSubmit={(e) => e.preventDefault()}>
      <OtpContainer>
        {[...new Array(6).keys()].map((ipt, index) => (
          <OtpInput
            key={ipt}
            name={ipt}
            type="password"
            autoComplete="off"
            value={value[ipt]}
            onChange={(e) => handleChange(e.target, index)}
            tabIndex={index}
            maxLength="1"
            onKeyUp={(e) => inputFocus(e, index)}
          />
        ))}
      </OtpContainer>
    </OtpForm>
  );
};
