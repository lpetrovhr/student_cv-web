export default {
  items: [
    {
      name: 'Početna',
      url: '/',
      icon: 'icon-home'
    },
    {
      title: true,
      name: 'Korisnik',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Profil',
      url: '/student/edit',
      icon: 'icon-pencil',
    },
    {
      name: 'Dodaj obavijest',
      url: '/posts/new',
      icon: 'icon-plus',
    },
    {
      name: 'Moje obavijesti',
      url: '/posts/self',
      icon: 'icon-person',
    },  
    {
      title: true,
      name: 'Posao',
      wrapper: {
        element: '',
        attributes: {}
      },
    },
    {
      name: 'Poslodavci',
      url: '/companies',
      icon: 'icon-briefcase',
    },
    {
      name: 'Obavijesti',
      url: '/posts',
      icon: 'icon-paper-plane',
    },
    {
      name: 'Studenti',
      url: '/students',
      icon: 'icon-people'
    },
    {
      divider: true
    }
  ]
};
