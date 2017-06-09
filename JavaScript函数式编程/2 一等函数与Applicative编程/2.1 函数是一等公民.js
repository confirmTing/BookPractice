const _ = require('../underscore');
// const _ = require('../../框架源码练习/underscore/underscore');
//命令式实现
function lyricFactory() {
    let lyric = [];
    for (let i = 4; i > 0; i--) {
        lyric.push(`墙上有${i}瓶啤酒`);
        lyric.push(`${i}瓶啤酒`);
        lyric.push(`拿一个下来分享给大家`);
        if (i > 1) {
            lyric.push(`墙上还有${i - 1}瓶啤酒`);
        } else {
            lyric.push(`墙上已经没有啤酒了`);
        }
    }
    return lyric.join(',');
}

console.log(lyricFactory());
//分离主要逻辑部分
function lyricSegment(i) {
    return _.chain([])
        .push(`墙上有${i}瓶啤酒`)
        .push(`${i}瓶啤酒`)
        .push(`拿一个下来分享给大家`)
        .tap(lyrics => {
            if (i > 1) {
                lyrics.push(`墙上还有${i - 1}瓶啤酒`);
            } else {
                lyrics.push(`墙上已经没有啤酒了`);
            }
        }).value();
}
//还可以传入别的生成歌词的函数生成不同的歌词
function song(start, end, lyricGen) {
    return _.reduce(_.range(start, end, -1), (acc, i) => {
        return acc.concat(lyricGen(i))
    }, [])
}

console.log(song(2, 0, lyricSegment));
