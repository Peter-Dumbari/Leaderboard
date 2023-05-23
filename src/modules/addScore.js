const addSccore = (name, score, ul) => {
  if (name !== undefined && score !== undefined) {
    if (ul !== undefined) {
      const li = document.createElement('li'); // Corrected typo: "createELement" to "createElement"
      li.innerHTML = `${name} ${score}`; // Removed "li.document" before innerHTML
      ul.appendChild(li); // Assuming ul is a valid reference to the <ul> element
    }
  }
};
export default addSccore;
