import { ScoreRepository } from "../models/score.repository";

async function getScoreByBookId(bookId: number) {
  const score = await ScoreRepository.findOne({ where: { bookId } });
  return score;
}

async function getScoreByUserId(userId: number) {
  const score = await ScoreRepository.findOne({ where: { userId } });
  return score;
}

async function createScore(userId: number, bookId: number, userRating: number) {
  const score = await ScoreRepository.build({
    userId,
    bookId,
    score: userRating,
  });
  score.save();
}

export default {
  getScoreByBookId,
  getScoreByUserId,
  createScore,
};
