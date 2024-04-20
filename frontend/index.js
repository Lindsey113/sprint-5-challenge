async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  const request1 = fetch('http://localhost:3003/api/learners')
  .then(res => res.json());
  
  const request2 = fetch('http://localhost:3003/api/mentors').then(res => res.json());
  const divCard = document.querySelector('.cards')
  const fetchingCards = document.querySelector('.info')
  

  function cardMaker(learners){
        learners.forEach(learner => {
          const cardDiv = document.createElement('div')
          const cardH3 = document.createElement('h3')
          const emailDiv = document.createElement('div')
          const h4 = document.createElement('h4')
          const mentorList = document.createElement('ul')
          const before = document.querySelector('.card h4.closed::before')
          const after = document.querySelector('.card h4.open::before')



          cardH3.textContent = learner.fullName
          emailDiv.textContent = learner.email
          h4.textContent = 'Mentors'

          mentorList.style.display = 'none'

          learner.mentors.forEach(mentor => {
            const mentorItem = document.createElement('li')
            mentorItem.textContent = mentor
            mentorList.appendChild(mentorItem)
          })


          h4.addEventListener('click', (evt) => {
            if(mentorList.style.display === 'none'){
              mentorList.style.display = 'block'
              evt.target.classList.remove('closed')
              evt.target.classList.add('open')
              cardDiv.className = 'card'
            } else {
              mentorList.style.display = 'none'
              evt.target.classList.remove('open')
              evt.target.classList.add('closed')
              cardDiv.className = 'card'

            }
            
          })

          fetchingCards.textContent = 'No learner is selected'
          
          cardDiv.addEventListener('click', (evt) => {
              if(cardDiv.className === 'card'){
                cardDiv.className = 'card selected'
                cardH3.textContent = `${learner.fullName}, ID ${learner.id}`
                fetchingCards.textContent = `The selected learner is ${learner.fullName}`
              } else {
                cardDiv.className = 'card'
                cardH3.textContent = `${learner.fullName}`
                fetchingCards.textContent = 'No learner is selected'
              }
          })

          divCard.addEventListener('click', evt => {
             const cardClick = evt.target.closest('.card')
             if (cardClick){
              const allCards = document.querySelectorAll('.card')
              allCards.forEach(card => {
                if(card !== cardClick){
                  card.classList.remove('selected')
                }
              })
              cardClick.classList.toggle('selected')
             }
            })
        

          cardDiv.classList.add('card')
          h4.classList.add('closed')
          
          cardDiv.appendChild(cardH3)
          cardDiv.appendChild(emailDiv)
          cardDiv.appendChild(h4)
          cardDiv.appendChild(mentorList)
          divCard.appendChild(cardDiv)

              })
              
            }
            
       
  
  
  
  Promise.all([request1, request2])
  .then(([data1, data2]) => {
    let learners = data1
    let mentors = data2
    let { data } = mentors
      mentors.forEach(mentor => {
      //console.log(mentor)
    })
          
    learners.forEach((learner) => {
      for(let i = 0; i < learner.mentors.length; i++){
          let mentor = mentors.find(mentor => mentor.id === learner.mentors[i])

      if(mentor){
        learner.mentors.splice(i, 1, `${mentor.firstName} ${mentor.lastName}`)
      }
    }
            console.log(learners)
  })
          
          cardMaker(learners)
         })
         .catch(error => {
          console.error(error)
         })
      





  // fetch(urlLeaners)
  //   .then(res => {
  //     // let learners = res.json()
  //     return res.json()
  //   })
  //   .then(data1 => {
  //     return fetch(`http://localhost:3003/api/mentors?data=${data1}`)
  //   })
  //   .then(res => {
  //     return res.json()
  //   })
  //   .then(data2 => {
  //     console.log(data2)
  //   })
    
  








  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
