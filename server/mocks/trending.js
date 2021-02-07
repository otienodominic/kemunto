const moment = require('moment')
    exports.trendingPosts = (req, res) => {
        res.json(
             [
                {
                    title: 'Software Engineer Salary in 2020',
                    date: moment().format('MMMM DD, YYYY'),
                    categories: ['Tech Culture'],
                    link: '#',
                    image: 'https://picsum.photos/200/300'
                },
                {
                    title: 'GraphQL vs REST',
                    date: moment().format('MMMM DD, YYYY'),
                    categories: ['React', 'JavaScript'],
                    link: '#',
                    image: 'https://picsum.photos/id/10/200/300',
                },
                {
                    title: 'A Day in the Life of a Programmer',
                    date: moment().format('MMMM DD, YYYY'),
                    categories: ['Tech Culture'],
                    link: '#',
                    image: 'https://picsum.photos/id/0/200/300'
                },
                {
                    title: 'Brain Hacks for Learning to Program',
                    date: moment().format('MMMM DD, YYYY'),
                    categories: ['Brain Health'],
                    link: '#',
                    image: 'https://picsum.photos/id/100/200/300'
                },
                {
                    title: 'React Vs Vue',
                    date: moment().format('MMMM DD, YYYY'),
                    categories: ['React', 'Vue'],
                    link: '#',
                    image: 'https://picsum.photos/id/23/200/300'
                },
            ]
        );
    };
