import { Sequelize } from "sequelize";
import { ScoreRepository } from "../models/score.repository";

async function getAverageScoreByBookId(bookId: number) {
  const score = await ScoreRepository.findOne({
    where: { bookId },
    attributes: [[Sequelize.fn("AVG", Sequelize.col("score")), "avgScore"]],
    group: ["bookId"],
  });
  return score;
}

async function getScoreByUserIdAndBookId(userId: number, bookId: number) {
  const score = await ScoreRepository.findOne({
    where: { userId, bookId },
  });
  return score;
}

async function createScore(userId: number, bookId: number, score: number) {
  const userScore = await ScoreRepository.build({
    userId,
    bookId,
    score,
  });
  userScore.save();
}

async function updateScore(userId: number, bookId: number, score: number) {
  await ScoreRepository.update({ score }, { where: { userId, bookId } });
}

export default {
  getScoreByBookId: getAverageScoreByBookId,
  createScore,
  getScoreByUserIdAndBookId,
  updateScore,
};
