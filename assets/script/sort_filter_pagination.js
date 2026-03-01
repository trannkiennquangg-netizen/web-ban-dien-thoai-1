// cards per page
var cards = 4

var cardList = document.querySelectorAll("div.filter1-item")
var container = document.querySelector("div.filter1-container")
var btnList = document.querySelectorAll("button.filter1-toggle")
var btnList2 = document.querySelectorAll("button.filter2-toggle")
var btnList3 = document.querySelectorAll("button.filter3-toggle")
var paginationList = document.querySelectorAll("a.page-number")
var paginationContainer = document.querySelector("ul.pagination")
var filterDataColor = filterData
var filterDataPrice = filterData
var filterDataResult = filterData
var arr = []
var cardAfterFilter = 0
var page = 0
var dataToRender = []
var cardStart = 0
var itemChild,img, division,title,body,button,cardList1,item

function createArr(){
    arr.push({
        parentClass: item.getAttribute("class"),
        parentDataPrice: item.getAttribute("data-price"),
        parentType: item.getAttribute("data-type-phone"),
        parentTypeColor: item.getAttribute("data-type-color"),
        cardClass: itemChild.getAttribute("class"),
        imgSource: img.getAttribute("src"),
        imgClass: img.getAttribute("class"),
        imgAlt: img.getAttribute("alt"),
        divClass: division.getAttribute("class"),
        titleClass: title.getAttribute("class"),
        titleContent: title.innerHTML,
        bodyClass: body.getAttribute("class"),
        bodyContent: body.innerHTML,
        buttonHREF: button.getAttribute("href"),
        buttonClass: button.getAttribute("class"),
        buttonContent: button.innerHTML
    })
}

cardList.forEach(item1=>{
    item = item1
    itemChild = item.querySelector(".card")
    img = itemChild.querySelector("img")
    division = itemChild.querySelector("div")
    title = division.querySelector(".card-title")
    body = division.querySelector(".card-text")
    button = division.querySelector("a")
    createArr()
})

var filterData = arr
cardAfterFilter = filterData.length
let currentPage = 1
page = Math.ceil(cardAfterFilter/cards)
cardAfterFilter = filterData.length
cardStart = (currentPage-1)*cards
dataToRender = filterData.slice(cardStart,cardStart+cards)
render(dataToRender)
paginationRender(page,currentPage)

// sort
document.getElementById('sort1-toggle-asc').addEventListener('click', function() {
  sortCards(true);
});
document.getElementById('sort1-toggle-des').addEventListener('click', function() {
  sortCards(false);
});

function sortCards(asc) {
  render(filterDataColor)
  let container = document.getElementById('sort-container');
  let cardsToSort = Array.from(container.getElementsByClassName('col'));
  cardsToSort.sort((a, b) => {
    let priceA = parseFloat(a.getAttribute('data-price'));
    let priceB = parseFloat(b.getAttribute('data-price'));
    return asc ? priceA - priceB : priceB - priceA;
  });
  cardsToSort.forEach(cardToRenderChild => container.appendChild(cardToRenderChild));
  filterDataColor = container
  filterDataPrice = container
  filterDataResult = container
  arr = []
  cardList1 = document.querySelectorAll("div.filter1-item")
  cardList1.forEach(item1=>{
    item = item1
    itemChild = item.querySelector(".card")
    img = itemChild.querySelector("img")
    division = itemChild.querySelector("div")
    title = division.querySelector(".card-title")
    body = division.querySelector(".card-text")
    button = division.querySelector("a")
    createArr()
  })
  filterDataColor = arr
  filterDataResult = arr
  cardAfterFilter = filterDataColor.length
  currentPage = 1
  page = Math.ceil(cardAfterFilter/cards)
  cardAfterFilter = filterDataColor.length
  cardStart = (currentPage-1)*cards
  dataToRender = filterDataColor.slice(cardStart,cardStart+cards)
  render(dataToRender)
  paginationRender(page,currentPage)
}

// filter
btnList.forEach(btn=>{
    btn.addEventListener('click', e=>{
        let type = e.currentTarget.getAttribute('data-type-phone')
        if (type == "all"){
            filterData = arr
        }
        else{
            filterData = arr.filter(item1=>{
            return item1.parentType == type
            })
        }
        cardAfterFilter = filterData.length
        currentPage = 1
        page = Math.ceil(cardAfterFilter/cards)
        cardAfterFilter = filterData.length
        cardStart = (currentPage-1)*cards
        dataToRender = filterData.slice(cardStart,cardStart+cards)
        render(dataToRender)
        paginationRender(page,currentPage)
        filterDataColor = filterData
        filterDataPrice = filterData
        filterDataResult = filterData
    })
})
function paginationListInit(){
  paginationList = document.querySelectorAll("a.page-number")
  paginationList.forEach(pag=>{
    pag.addEventListener('click', a=>{
        currentPage = parseInt(a.currentTarget.innerHTML)
        page = Math.ceil(cardAfterFilter/cards)
        cardAfterFilter = filterDataResult.length
        cardStart = (currentPage-1)*cards
        dataToRender = filterDataResult.slice(cardStart,cardStart+cards)
        render(dataToRender)
        paginationRender(page,currentPage)
        paginationList = document.querySelectorAll("a.page-number")
    })
  })
}
paginationListInit()

function render(list){
    container.innerHTML = ""
    list.forEach(item=>{
        let filterParent = document.createElement("div")
        filterParent.setAttribute("class",item.parentClass)
        filterParent.setAttribute("data-price",item.parentDataPrice)
        filterParent.setAttribute("data-type-phone",item.parentType)
        filterParent.setAttribute("data-type-color",item.parentTypeColor)

        let filterCard = document.createElement("div")
        filterCard.setAttribute("class",item.cardClass)
        let filterImg = document.createElement("img")
        filterImg.src = item.imgSource
        filterImg.setAttribute("class",item.imgClass)
        filterImg.alt = item.imgAlt

        let filterCardBody = document.createElement("div")
        filterCardBody.setAttribute("class",item.divClass)
        let filterTitle = document.createElement("p")
        filterTitle.setAttribute("class",item.titleClass)
        filterTitle.textContent = item.titleContent
        let filterBody = document.createElement("p")
        filterBody.setAttribute("class",item.bodyClass)
        filterBody.textContent = item.bodyContent
        let filterButton = document.createElement("a")
        filterButton.href = item.buttonHREF
        filterButton.setAttribute("class",item.buttonClass)
        filterButton.textContent = item.buttonContent
        
        filterCardBody.appendChild(filterTitle)
        filterCardBody.appendChild(filterBody)
        filterCardBody.appendChild(filterButton)

        filterCard.appendChild(filterImg)
        filterCard.appendChild(filterCardBody)

        filterParent.appendChild(filterCard)

        container.append(filterParent)
    })
    if (list.length == 0){
      let errorContainer = document.createElement("div")
      errorContainer.setAttribute("class","col")
      let noItem = document.createElement("p")
      noItem.setAttribute("class","text-center")
      noItem.innerHTML = "Không có sản phẩm"
      errorContainer.appendChild(noItem)
      container.appendChild(errorContainer)
    }
}

function paginationRender(numberOfPage,currentPage1){
    paginationContainer.innerHTML = ""
    for (let i = 1; i<=numberOfPage;i++){
        let pageItem = document.createElement("li")
        pageItem.setAttribute("class","page-item")
        if (i == currentPage1){
            pageItem.classList.add("active")
        }
        let pageLink = document.createElement("a")
        pageLink.setAttribute("class","page-link page-number")
        pageLink.innerHTML = i
        pageItem.appendChild(pageLink)
        paginationContainer.append(pageItem)
        paginationListInit()
    }
}

filterDataColor = filterData
btnList2.forEach(btn=>{
    btn.addEventListener('click', e=>{
        let type = e.currentTarget.getAttribute('data-type-color')
        if (type == "all"){
            filterDataColor = filterDataPrice
        }
        else{
            filterDataColor = filterDataPrice.filter(item1=>{
            return item1.parentTypeColor == type
            })
        }
        cardAfterFilter = filterDataColor.length
        currentPage = 1
        page = Math.ceil(cardAfterFilter/cards)
        cardAfterFilter = filterDataColor.length
        cardStart = (currentPage-1)*cards
        dataToRender = filterDataColor.slice(cardStart,cardStart+cards)
        render(dataToRender)
        paginationRender(page,currentPage)
        filterDataResult = filterDataColor
    })
})
filterDataPrice = filterData
btnList3.forEach(btn=>{
    btn.addEventListener('click', e=>{
        let typeMin = e.currentTarget.getAttribute('data-type-price-min')
        let typeMax = e.currentTarget.getAttribute('data-type-price-max')
        if (typeMin == -1 && typeMax == -1){
            filterDataPrice = filterDataColor
        }
        else{
            filterDataPrice = filterDataColor.filter(item1=>{
              return item1.parentDataPrice>=typeMin && item1.parentDataPrice<=typeMax
            })
        }
        cardAfterFilter = filterDataPrice.length
        currentPage = 1
        page = Math.ceil(cardAfterFilter/cards)
        cardAfterFilter = filterDataPrice.length
        cardStart = (currentPage-1)*cards
        dataToRender = filterDataPrice.slice(cardStart,cardStart+cards)
        render(dataToRender)
        paginationRender(page,currentPage)
        filterDataResult = filterDataPrice
    })
})
filterDataResult = filterData