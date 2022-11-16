function renderTag (budgetTags){
    let buildTag = budgetTags.toString();
    return  `<td class="first=child">${buildTag}</td>`
}

module.exports= {
    renderTag
}