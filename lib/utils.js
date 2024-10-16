export const isBishop = ({code}) => code.toLowerCase() === 'b';
export const isKing = ({code}) => code.toLowerCase() === 'k';
export const isQueen = ({code}) => code.toLowerCase() === 'q';
export const isKnight = ({code}) => code.toLowerCase() === 'n';
export const isPawn = ({code}) => code.toLowerCase() === 'p';
export const isRook = ({code}) => code.toLowerCase() === 'r';

let _id = 1;
export const createid = () => _id++;

export const parsefen = (fen) => {
    const [pieces, whoToMove, castling] = fen.split(' ');

    let x = 0;
    let y = 0;

    let result = [];

    for (let value of pieces.split('')) {
        if ('12345678'.includes(value)) {
            x += Number(value);
        } else if ('rnbqkpRNBQKP'.includes(value)) {
            result.push({ id: createid(), position: { x: x++, y }, code: value });
        } else if (value === '/') {
            x = 0;
            y++;
        }
    }



    // v.split('').forEach((value) => {
        
    // });

    return {
        pieces: result.map((r) => ({ ...r, position: {x:r.position.x, y: 7 - r.position.y } })),
        whiteToMove: whoToMove === 'w',
        castle: {
            K: castling.includes('K'),
            Q: castling.includes('Q'),
            k: castling.includes('k'),
            q: castling.includes('q'),
        },
    };
};

export const DEFAULT_POSITION = 
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

// 3QQ1Q1/k7/8/1Q6/5Q2/pP6/P7/2R3K1 b - - 0 50
