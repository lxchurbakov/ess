#!/usr/bin/env node
import { cursorTo, cursorBackward, eraseScreen } from 'ansi-escapes';
import chalk from 'chalk';
import { Chess } from './lib/chess.js';
import { isWhite } from './lib/moves.js';

// console.log('asd');

// const x = 1;
// const y = 1;

// process.stdout.write(`\x33[{$y};${x}HSUP`)
const {columns, rows } = process.stdout;
const write = process.stdout.write.bind(process.stdout);

write(eraseScreen);

const FIGURES = {
    PAWN: { BLACK: '♙', WHITE: '♟' },
    KING: { BLACK: '♔', WHITE: '♚' },
    QUEEN: { BLACK: '♕', WHITE: '♛' },
    ROOK: { BLACK: '♖', WHITE: '♜' },
    BISHOP: { BLACK: '♗', WHITE: '♝' },
    KNIGHT: { BLACK: '♘', WHITE: '♞' },
};

const BY_CODE = {
    'r': FIGURES.ROOK.BLACK,
    'n': FIGURES.KNIGHT.BLACK,
    'b': FIGURES.BISHOP.BLACK,
    'q': FIGURES.QUEEN.BLACK,
    'k': FIGURES.KING.BLACK,
    'p': FIGURES.PAWN.BLACK,
    'R': FIGURES.ROOK.WHITE,
    'N': FIGURES.KNIGHT.WHITE,
    'B': FIGURES.BISHOP.WHITE,
    'Q': FIGURES.QUEEN.WHITE,
    'K': FIGURES.KING.WHITE,
    'P': FIGURES.PAWN.WHITE,
};

const draw_chessboard = (x, y, chess) => {
    write(cursorTo(x, y));

    for (let y = 0; y < 8; ++y) {
        write(cursorTo(x, y));

        for (let x = 0; x < 8; ++x) {
            const bg = ['bgWhite', 'bgBlack'][(x + y) % 2];
            

            const piece = chess.find({ x, y });
            const color = piece && isWhite(piece) ? 'white' : 'black';
            // console.log(piece.code)
            const character = piece ? BY_CODE[piece.code] : ' ';

            write(chalk[bg][color](` ${character} `));
        }

        write('\n');
        write(cursorBackward(8));
    } 
};

const c = new Chess();

c.load('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');

// console.log(chess)

draw_chessboard(2, 2, c);

// process.stdout.write(`${eraseScreen}${cursorTo(0, 0)}♔\n`);

// process.stdout.write(`${cursorTo(0, 10)}${eraseLine}SUP MATE\n`)