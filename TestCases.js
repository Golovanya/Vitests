export const TEST_CASES = [
    {
        description: "Not Foreign Physical person / Отечественное физическое лицо",
        formData:{isForeign:false, isJuridical:false, title:"Вова Сидоров", tin:"7743013902"},
        expected:{type:"physical", tin:"7743013902", name: "Вова Сидоров", foreign_tin:null, company_title: null}
    },
    {
        description: "Not Foreign Juridical person / Отечественное юридическое лично",
        formData:{isForeign:false, isJuridical:true, title:"ИП Вова Сидоров", tin:"7743013902"},
        expected:{type:"juridical", tin:"7743013902", name: null, foreign_tin:null, company_title: "ИП Вова Сидоров"}
    },
    {
        description: "Foreign Physical person / Иностранное физическое лицо",
        formData:{isForeign:true, isJuridical:false, title:"Вова Сидоров", tin:"7743013902"},
        expected:{type:"foreign_physical", tin: null, name: "Вова Сидоров", foreign_tin:"7743013902", company_title: null}
    },
    {
        description: "Foreign Juridical person / Иностранное юридическое лицо лицо",
        formData:{isForeign:true, isJuridical:true, title:"ИП Вова Сидоров", tin:"7743013902"},
        expected:{type:"foreign_juridical", tin:null, name: null, foreign_tin:"7743013902", company_title:"ИП Вова Сидоров" }
    },
    {
        description: "Form with emptyStrings / Форма с незаполненными полями",
        formData:{isForeign:true, isJuridical:true, title:"", tin:""},
        expected:{type:"foreign_juridical", tin:null, name: null, foreign_tin:null, company_title: null }
    },
    {
        description: "Foreign with undefind value / Форма возвращающая undefind",
        formData:{isForeign:true, isJuridical:true, title:undefined, tin:undefined},
        expected:{type:"foreign_juridical", tin:null, name: null, foreign_tin:null, company_title: null }
    },
    {
        description: "XSS security / Проверка защиты от Cross-Site Scripting",
        formData:{isForeign:true, isJuridical:true, title:'<script>alert("XSS")</script>', tin:'<script>alert("XSS")</script>'},
        expected: false
    },

]