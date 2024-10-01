//console.log('Bağlantı Kontrolu')

//1-Tüm Koltukların kapsayıcısı container divi çek
//2-container a clikck eventi ekle

//html tarafından querySelector ile className üzerinden eleman çekme
const container = document.querySelector(".container");
//html tarafından çekilen elemanın kontrolü
//console.log(container);

const infoText = document.querySelector(".infoText");
//console.log(infoText)

const movieList = document.querySelector("#movie");
//console.log(movieList)

const seatCount = document.getElementById("count");
//console.log(seatCount)

const totalAmount = document.getElementById("amount");
//console.log(totalAmount)

const seats = document.querySelectorAll(".seat:not(.reserved)");
//console.log(seats)

//!Veri Kaydetme Fonksiyonu (saveToDatabase):

const saveToDatabase = (index) => {
  //console.log('data',index)

  //!localStorage'dan daha önce kaydedilen seatsIndex ve movieIndex verilerini çeker.

  //koltuk verisi kaydi

  localStorage.setItem("seatsIndex", JSON.stringify(index));

  //Film verisi kaydı

  localStorage.setItem("movieIndex", JSON.stringify(movieList.selectedIndex));
};

//!localStorage'dan daha önce kaydedilen seatsIndex ve movieIndex verilerini çeker.
const getFromDatabase = () => {
  const dbSelectedSeats = JSON.parse(localStorage.getItem("seatsIndex"));
  //console.log(dbSelectedSeats)

  //Eğer seatsIndex verisi varsa, bu indekslere karşılık gelen koltuklar seçilmiş (selected) olarak işaretlenir.
  if (dbSelectedSeats !== null) {
    seats.forEach((seat, index) => {
      if (dbSelectedSeats.includes(index)) {
        seat.classList.add("selected");
      }
    });
  }

  const dbSelectedMovie = JSON.parse(localStorage.getItem("movieIndex"));
  movieList.selectedIndex = dbSelectedMovie;
};
//!İndeks Oluşturma Fonksiyonu (createIndex):

getFromDatabase();

//!Tüm koltuklar bir diziye (allSeatsArray) eklenir.

const createIndex = () => {
  let allSeatsArray = [];

  seats.forEach((seat) => {
    allSeatsArray.push(seat);
  });

  //console.log(allSeatsArray)
  //!Seçili koltuklar (selected) ayrı bir diziye (allSelectedSeatsArray) eklenir.

  const allSelectedSeatsArray = [];

  const allSelectedSeats = container.querySelectorAll(".seat.selected");

  allSelectedSeats.forEach((selectedSeat) => {
    allSelectedSeatsArray.push(selectedSeat);
  });
  //!Seçili koltukların indeksleri bulunur
  //console.log(allSelectedSeatsArray)
  const selectedSeatsIndex = allSelectedSeatsArray.map((seletedSeat) => {
    return allSeatsArray.indexOf(seletedSeat);
  });
  //console.log(selectedSeatsIndex);
  //!ve bu indeksler saveToDatabase fonksiyonuna kaydedilir.
  saveToDatabase(selectedSeatsIndex);
};

//!Toplamı Hesaplama Fonksiyonu (calculateTotal):

const calculateTotal = () => {
  createIndex();
  // console.log('calculate çalıştı')

  let selectedSeatsCount = container.querySelectorAll(".seat.selected").length;
  //console.log(selectedSeatsCount)
  //!Seçili koltuk sayısı hesaplanır ve seatCount HTML elemanına yazılır.

  seatCount.innerText = selectedSeatsCount;
  //console.log(count);
  //!Toplam tutar hesaplanır ve totalAmount HTML elemanına yazılır.

  totalAmount.innerText = selectedSeatsCount * movieList.value;
  //console.log(totalAmount)

  //!Eğer seçili koltuk varsa, infoText elemanı görünür hale getirilir, yoksa gizlenir.

  if (selectedSeatsCount) {
    infoText.classList.add("open");
  } else {
    infoText.classList.remove("open");
  }
};
calculateTotal();
//!container için bir tık (click) etkinlik dinleyicisi eklenir: Bir koltuk tıklandığında, eğer koltuk rezervli değilse, bu koltuk seçilmiş olarak işaretlenir ya da seçim kaldırılır.

container.addEventListener("click", (pointerEvent) => {
  //console.log('container tıklandı')
  //console.log(pointerEvent.target.offsetParent)
  const clickedSeat = pointerEvent.target.offsetParent;

  if (
    clickedSeat.classList.contains("seat") &&
    !clickedSeat.classList.contains("reserved")
  ) {
    clickedSeat.classList.toggle("selected");
  }
  calculateTotal();
});
//!movieList için bir değişim (change) etkinlik dinleyicisi eklenir: Film seçimi değiştiğinde toplam hesaplamalar tekrar yapılır.

movieList.addEventListener("change", () => {
  calculateTotal();
});
