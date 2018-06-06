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
      url: '/user/edit',
      icon: 'icon-pencil',
    },
    {
      name: 'Životopis',
      url: '/user/cv',
      icon: 'icon-docs',
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
      url: '/events',
      icon: 'icon-bell',
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
