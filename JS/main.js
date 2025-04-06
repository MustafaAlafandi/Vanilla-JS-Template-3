function openCloseMenu(list, list_icon) {
  function toggleOpen() {
    list.classList.toggle("open");
  }
  function removeOpen() {
    list.classList.remove("open");
  }
  list_icon.addEventListener("click", (e) => e.stopPropagation());
  list_icon.onclick = toggleOpen;
  document.addEventListener("click", (e) => {
    e.target !== list_icon && e.target !== list ? removeOpen() : 1;
  });
}
function getFromSessionStorage(key, virual_value) {
  let item = sessionStorage.getItem(key);
  return item !== null ? item : virual_value;
}
function saveInSessionStroage(key, value) {
  sessionStorage.setItem(key, value);
}
function removeFromAllAddToOne(all, number, the_class) {
  all.forEach((ele) => {
    ele.classList.remove(the_class);
  });
  all[number].classList.add(the_class);
}
function SMminus(number) {
  number = Number(number);
  number--;
  if (number < 0) number = 59;
  return String(number);
}
function hourminus(number) {
  number = Number(number);
  number--;
  if (number < 0) number = 23;
  return String(number);
}
function normalminus(number) {
  number = Number(number);
  number--;
  return String(number);
}
//open close megamenu
let list = document.querySelector(".hmegaMenu");
let list_icon = document.querySelector("header .main-nav>li:last-child");
openCloseMenu(
  list,
  list_icon,
  ...[...document.querySelectorAll(".hmegaMenu li a")]
);
//fill skills
let I_arraive_skills = false;
let skill_percent_elements = [
  ...document.querySelectorAll(".skills .rate .the-progress span"),
];
let skill_percent_write = [
  ...document.querySelectorAll(".skills .rate h3 span"),
];
let skills_percents = [80, 75, 70, 80];
addEventListener("scroll", () => {
  let skills = document.querySelector(".skills .rates");
  let offset_top = skills.offsetTop;
  let offset_height = skills.offsetHeight;
  let window_height = this.innerHeight;
  let window_scroll = scrollY;
  if (window_scroll >= offset_top + offset_height - window_height) {
    if (!I_arraive_skills) {
      skill_percent_elements.forEach(
        (ele, i) => (ele.style.width = String(skills_percents[i]) + "%")
      );
      let intervalId = setInterval(
        () =>
          skill_percent_write.forEach(
            (ele, i) =>
              (ele.innerHTML = String(
                Number(ele.innerHTML.slice(0, -1)) +
                  Math.floor(skills_percents[i] / 10) +
                  "%"
              ))
          ),
        100
      );
      setTimeout(() => {
        skill_percent_write.forEach(
          (ele, i) => (ele.innerHTML = String(skills_percents[i]) + "%")
        );
        clearInterval(intervalId);
      }, 1000);
      I_arraive_skills = true;
    }
  }
});
// add time to counter
let time = [372, 0, 0, 10];
let functions = [normalminus, hourminus, SMminus, SMminus];
let numbers = document.querySelectorAll(".events .top .time .number");
numbers.forEach((ele, i) => {
  let top = document.createElement("span");
  top.classList.add("top");
  let bottom = document.createElement("span");
  bottom.classList.add("bottom");
  top.innerHTML = functions[i](time[i]);
  bottom.innerHTML = String(time[i]);
  ele.append(top);
  ele.append(bottom);
});
// change counter
let event_counter = document.querySelectorAll(
  ".events .top .time .number .top"
);
let event_counter2 = document.querySelectorAll(
  ".events .top .time .number .bottom"
);
let counter_interval_id = setInterval(() => {
  event_counter[3].style.animation = "counter-top .3s linear";
  event_counter2[3].style.animation = "counter-bottom .3s linear";
  if (event_counter2[3].innerHTML === "0") {
    event_counter[2].style.animation = "counter-top .5s linear";
    event_counter2[2].style.animation = "counter-bottom .5s linear";
    if (event_counter2[2].innerHTML === "0") {
      event_counter[1].style.animation = "counter-top .7s linear";
      event_counter2[1].style.animation = "counter-bottom .7s linear";
      if (event_counter2[1].innerHTML === "0") {
        event_counter[0].style.animation = "counter-top 1s linear";
        event_counter2[0].style.animation = "counter-bottom 1s linear";
      }
    }
  }
  if (event_counter2[0].innerHTML === "-1") {
    event_counter.forEach((ele) => {
      ele.innerHTML = "0";
      ele.style.animation = "";
    });
    event_counter2.forEach((ele) => {
      ele.innerHTML = "0";
      ele.style.animation = "";
    });
    clearInterval(counter_interval_id);
  }
  // for (let i = event_counter.length - 1; i >= 0; i--) {
  //   let new_value = Number(event_counter[i].innerHTML);
  //   new_value--;
  //   if (new_value < 0) {
  //     new_value = 59;
  //     if (i === 0) {
  //       event_counter.forEach((ele) => (ele.innerHTML = "0"));
  //       clearInterval(counter_interval_id);
  //       break;
  //     }
  //     if (i === 1) new_value = 23;
  //     event_counter[i].innerHTML = String(new_value);
  //   } else {
  //     event_counter[i].innerHTML = String(new_value);
  //     break;
  //   }
  // }
}, 1000);
let counter_elements = document.querySelectorAll(
  ".events .top .time .number span"
);
counter_elements.forEach((ele, i) => {
  ele.onanimationend = (e) => {
    e.target.innerHTML = functions[Math.floor(i / 2)](e.target.innerHTML);
    e.target.style.animation = "";
  };
});
// save email in session stroage
let email = document.querySelector(`.events .email input[type="email"]`);
email.value = getFromSessionStorage("email", "");
email.onblur = () => saveInSessionStroage("email", email.value);
//change the video
let videos_link = [
  "videos/01.mp4",
  "videos/02.mp4",
  "videos/03.mp4",
  "videos/04.mp4",
  "videos/01.mp4",
  "videos/04.mp4",
  "videos/03.mp4",
];
let videos_name = [
  "How To Create Sub Domain",
  "Playing With The DNS",
  "Everything About The Virtual Hosts",
  "How To Monitor Your Website",
  "Ys Oath In Felghana Overview",
  "How To Create Sub Domain",
  "Ys Series All Games Ending",
];
let videos_elements = [];
let videos_list_element = document.querySelector(".videos ul");
let videos_ul = document.querySelector(".videos ul");
//Form videos list
for (i in videos_name) {
  let li = document.createElement("li");
  let div = document.createElement("div");
  div.innerHTML = videos_name[i];
  let span = document.createElement("span");
  span.innerHTML = "00:00";
  li.append(div);
  li.append(span);
  videos_ul.append(li);
}
//add li events
[...videos_ul.querySelectorAll("li")].forEach((ele, i) => {
  ele.onclick = () => {
    removeFromAllAddToOne([...videos_ul.querySelectorAll("li")], i, "choosed");
    let parrent = document.querySelector(".videos .preview");
    let img = document.querySelector(".videos .preview img");
    let video = document.querySelector(".videos .preview video");
    let current_video = document.createElement("video");
    current_video.src = videos_link[i];
    if (img !== null) {
      img.remove();
    } else {
      video.remove();
    }
    parrent.prepend(current_video);
    current_video.play();
    current_video.nextElementSibling.innerHTML = videos_name[i];
    function isVideoInFullscreen(videoElement) {
      return (
        document.fullscreenElement === videoElement ||
        document.mozFullScreenElement === videoElement || // Firefox
        document.webkitFullscreenElement === videoElement || // Chrome, Safari and Opera
        document.msFullscreenElement === videoElement // IE/Edge
      );
    }
    function clickFun(ele) {
      if (ele.paused) ele.play();
      else ele.pause();
    }
    current_video.ondblclick = (e) => e.target.requestFullscreen();
    current_video.onclick = (e) => {
      if (!isVideoInFullscreen(e.target)) clickFun(e.target);
    };
  };
});
for (i in videos_link) {
  let video = document.createElement("video");
  video.src = videos_link[i];
  videos_elements.push(video);
}
//get and put the time of videos
let videos_period_elements = [
  ...document.querySelectorAll(".videos ul li span"),
];
videos_elements.forEach(
  (ele, i) =>
    (ele.onloadedmetadata = () => {
      let duration = ele.duration;
      let minutes = 0,
        seconds = 0;
      if (Math.floor(duration / 60) > 0) {
        minutes += Math.floor(duration / 60);
        seconds += Math.floor(duration % 60);
        minutes = minutes < 9 ? "0" + String(minutes) : String(minutes);
        seconds = seconds < 9 ? "0" + String(seconds) : String(seconds);
        videos_period_elements[i].innerHTML =
          String(minutes) + ":" + String(seconds);
      } else {
        duration = duration < 9 ? "0" + String(duration) : String(duration);
        duration = "00:" + Math.floor(duration);
        videos_period_elements[i].innerHTML = duration;
      }
    })
);
//save discount information in session stroage
let [name, email2, phone_number] = document.querySelectorAll(".request input");
let message = document.querySelector(".request textarea");
name.value = getFromSessionStorage("name", "");
email2.value = getFromSessionStorage("email2", "");
phone_number.value = getFromSessionStorage("phone-number", "");
message.value = getFromSessionStorage("message", "");
let all = [name, email2, phone_number, message];
let all_keys = ["name", "email2", "phone-number", "message"];
all.forEach(
  (ele, i) =>
    (ele.onblur = (e) => saveInSessionStroage(all_keys[i], e.target.value))
);
