<?php
/**
 * @return array
 */
function getAnime()
{
    return [
        [
            "id" => 1,
            "name" => "Charlotte",
            "image" => "https://dailyanimeart.files.wordpress.com/2015/08/charlotte-anime-poster1.jpg",
        ],
        [
            "id" => 2,
            "name" => "Code Geass: Lelouch of the Rebellion",
            "image" => "https://static.tvtropes.org/pmwiki/pub/images/image_0250.jpeg",
        ],
        [
            "id" => 3,
            "name" => "Death Note",
            "image" => "https://pm1.narvii.com/7080/d0280e2a2d3fa2e8a5d0501c31f6d154806b5e5er1-452-678v2_hq.jpg",
        ],
        [
            "id" => 4,
            "name" => "Guilty Crown",
            "image" => "https://i.pinimg.com/originals/1b/7f/3f/1b7f3f4f7d630ea7a18ec6a66da17495.jpg",
        ],
        [
            "id" => 5,
            "name" => "Naruto Shippūden",
            "image" => "https://i.pinimg.com/originals/f1/b8/32/f1b832a4a2c4623264916a5e3b1adbec.jpg",
        ]
    ];
}

/**
 * @param $id
 * @return mixed
 */
function getAnimeDetails($id)
{
    $tags = [
        1 => [
            "description" => "The story takes place in an alternate reality where a small percentage of children manifest superhuman abilities upon reaching puberty. A focus is placed on Yuu Otosaka, a high school boy who awakens the ability to temporarily possess others, which brings him to the attention of Nao Tomori, the student council president of a school founded as a haven for children with such abilities.",
            "genre" => ['Drama', ' School', ' Super Power']
        ],
        2 => [
            "description" => "After being given a mysterious power to control others, an outcast prince becomes the masked leader of the rebellion against an all powerful empire.",
            "genre" => ['Action', ' Military', ' Sci-Fi', ' Super Power', ' Drama', ' Mecha', ' School']
        ],
        3 => [
            "description" => "An intelligent high school student goes on a secret crusade to eliminate criminals from the world after discovering a notebook capable of killing anyone whose name is written into it.",
            "genre" => ['Mystery', ' Police', ' Psychological', ' Supernatural', ' Thriller', ' Shounen']
        ],
        4 => [
            "description" => "After the outbreak of the unidentified virus Lost Christmas in 2029, Japan has been under the control of a multi-nation organization called GHQ. Ohma Shu is a 17 year old boy who has a psychic power in his right hand. He can use the power Ability of King to extract tools or weapons from his friends. He has been avoiding making trouble for others but his life changes when he meets a girl Yuzuriha Inori, a member of a resistance guerrilla group called Funeral Parlor, whose members pilot mecha weapons to fight against the government.",
            "genre" => ['Action', ' Sci-Fi', ' Super Power', ' Drama', ' Romance', ' Mecha']
        ],
        5 => [
            "description" => "Naruto Uzumaki, is a loud, hyperactive, adolescent ninja who constantly searches for approval and recognition, as well as to become Hokage, who is acknowledged as the leader and strongest of all ninja in the village.",
            "genre" => ['Action', ' Adventure', ' Comedy', ' Super Power', ' Martial Arts', ' Shounen']
        ]
    ];

    return $tags[$id];
}