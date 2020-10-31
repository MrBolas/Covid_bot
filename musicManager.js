class musicManager {

    cosntructor(){}

    static getRandomSong(){
        let song_index = Math.round(Math.random()*playlist.length);
        return playlist[song_index];
    }

}

//sendVoice(<chat_id>, <file_id | path | url | buffer | stream>, {duration, caption, fileName, serverDownload, replyToMessage, replyMarkup, notification})

const playlist = [
    {
        filepath: './assets/All_the_way_up.mp3',
        metadata: {
            duration:'',
            caption:'Covid Passive Agressive Songs Track#1',
            filename:'rip_covid_songs.mp3',
        }
    },
    {
        filepath: './assets/Astronomia-Vicetone.mp3',
        metadata: {
            duration:'',
            caption:'Covid Passive Agressive Songs Track#2',
            filename:'rip_covid_songs.mp3',
        }
    },
    {
        filepath: './assets/bodies-Drowning_pool.mp3',
        metadata: {
            duration:'',
            caption:'Covid Passive Agressive Songs Track#3',
            filename:'rip_covid_songs.mp3',
        }
    },
    {
        filepath: './assets/cant_touch_this-MCHammer.mp3',
        metadata: {
            duration:'',
            caption:'Covid Passive Agressive Songs Track#4',
            filename:'rip_covid_songs.mp3',
        }
    },
    {
        filepath: './assets/friday-Rebecca_black.mp3',
        metadata: {
            duration:'',
            caption:'Covid Passive Agressive Songs Track#5',
            filename:'rip_covid_songs.mp3',
        }
    },
    {
        filepath: './assets/heads_will_roll-Yeah_Yeah_Yeahs.mp3',
        metadata: {
            duration:'',
            caption:'Covid Passive Agressive Songs Track#6',
            filename:'rip_covid_songs.mp3',
        }
    },
    {
        filepath: './assets/hello-Lionel_Richie.mp3',
        metadata: {
            duration:'',
            caption:'Covid Passive Agressive Songs Track#7',
            filename:'rip_covid_songs.mp3',
        }
    },
    {
        filepath: './assets/never_gonna_give_u_up-Rick_Ashley.mp3',
        metadata: {
            duration:'',
            caption:'Covid Passive Agressive Songs Track#7',
            filename:'rip_covid_songs.mp3',
        }
    },
    {
        filepath: './assets/take_on_me-a-ha.mp3',
        metadata: {
            duration:'',
            caption:'Covid Passive Agressive Songs Track#8',
            filename:'rip_covid_songs.mp3',
        }
    },
    {
        filepath: './assets/tunak_tunak_tun-Daler_Mehndi.mp3',
        metadata: {
            duration:'',
            caption:'Covid Passive Agressive Songs Track#9',
            filename:'rip_covid_songs.mp3',
        }
    },
    {
        filepath: './assets/turn_down_for_what-Lil_Jon.mp3',
        metadata: {
            duration:'',
            caption:'Covid Passive Agressive Songs Track#10',
            filename:'rip_covid_songs.mp3',
        }
    },
    {
        filepath: './assets/what_is_love-Haddaway.mp3',
        metadata: {
            duration:'',
            caption:'Covid Passive Agressive Songs Track#11',
            filename:'rip_covid_songs.mp3',
        }
    },
    {
        filepath: './assets/you_spin_me_round-Dead_Or_alive.mp3',
        metadata: {
            duration:'',
            caption:'Covid Passive Agressive Songs Track#12',
            filename:'rip_covid_songs.mp3',
        }
    },

]

module.exports = musicManager;