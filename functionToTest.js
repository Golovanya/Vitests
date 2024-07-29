export const formFormToServer = (personInForm) => ({
  type: [
    personInForm.isForeign ? null : "foreign",
    personInForm.isJuridical ? "juridical" : "physical",
  ]
    .filter(Boolean)
    .join("_"),
  tin: personInForm.isForeigh ? null : personInForm.tin,
  name: personInForm.isJuridical ? null : personInForm.title,
  foreign_tin: personInForm.isForeign ? personInForm.tin : null,
  company_title: personInForm.isJuridical ? personInForm.title : null,
});




export const fixedFunction = (personInForm) => {
  if (personInForm.title && personInForm.tin){
   if (personInForm.title.includes("<script>") && personInForm.tin.includes("<script>")){
    return false
   }
  }
  return {type: [
    personInForm.isForeign ?"foreign"  : null,
    personInForm.isJuridical ? "juridical" : "physical",
  ]
    .filter(Boolean)
    .join("_"),
  tin: personInForm.isForeign ? null : personInForm.tin,
  name: personInForm.isJuridical ? null : personInForm.title,
  foreign_tin: personInForm.isForeign ? (personInForm.tin ? personInForm.tin : null) : null ,
  company_title: personInForm.isJuridical ? (personInForm.title? personInForm.title : null) : null,}
}
  
  
