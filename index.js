#!/usr/bin/env node
import { cursorTo, cursorBackward, eraseScreen } from 'ansi-escapes';
import chalk from 'chalk';
import { Chess } from './lib/chess.js';

// console.log('asd');

// const x = 1;
// const y = 1;

// process.stdout.write(`\x33[{$y};${x}HSUP`)
const {columns, rows } = process.stdout;
const write = process.stdout.write.bind(process.stdout);

write(eraseScreen);

const FIGURES = {
    PAWN: { WHITE: '♙', BLACK: '♟' },
    KING: { WHITE: '♔', BLACK: '♚' },
    QUEEN: { WHITE: '♕', BLACK: '♛' },
    ROOK: { WHITE: '♖', BLACK: '♜' },
    BISHOP: { WHITE: '♗', BLACK: '♝' },
    KNIGHT: { WHITE: '♘', BLACK: '♞' },
};

const BY_CODE = {
    'r': FIGURES.ROOK.WHITE,
    'n': FIGURES.KNIGHT.WHITE,
    'b': FIGURES.BISHOP.WHITE,
    'q': FIGURES.QUEEN.WHITE,
    'k': FIGURES.KING.WHITE,
    'p': FIGURES.PAWN.WHITE,
    'R': FIGURES.ROOK.BLACK,
    'N': FIGURES.KNIGHT.BLACK,
    'B': FIGURES.BISHOP.BLACK,
    'Q': FIGURES.QUEEN.BLACK,
    'K': FIGURES.KING.BLACK,
    'P': FIGURES.PAWN.BLACK,
};

const draw_chessboard = (x, y, chess) => {
    write(cursorTo(x, y));

    for (let y = 0; y < 8; ++y) {
        write(cursorTo(x, y));

        for (let x = 0; x < 8; ++x) {
            const color = ['bgWhite', 'bgBlack'][(x + y) % 2];

            const piece = chess.find({ x, y });
            // console.log(piece.code)
            const character = piece ? BY_CODE[piece.code] : ' ';

            write(chalk[color](` ${character} `));
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