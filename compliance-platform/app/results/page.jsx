import React from 'react';

const ResultsPage = () => {
  return <div>
    <div class="form-container">
        <div class="form-header">
            <label for="form-name">Form name</label>
            <input type="text" id="form-name"></input>
            <label for="assigned-to">Assigned to</label>
            <select id="assigned-to" multiple>
                <option>LOB 1</option>
                <option>LOB 2</option>
                <option>LOB 3</option>
            </select>
        </div>
        <div class="red-flags-values">
            <div class="red-flags">
                <label>Red Flags</label>
                <div class="flag">1</div>
                <div class="flag">2</div>
                <button class="add-button">+</button>
            </div>
            <div class="values">
                <label>Values</label>
                <div class="value">1</div>
                <div class="value">2</div>
                <div class="value">3</div>
                <div class="value">4</div>
                <button class="add-button">+</button>
            </div>
        </div>
        <div class="question-section blue">
            <div class="question">
                <label>Introduction: Did the agent give a proper introduction?</label>
                <textarea>Stating their name and where they're calling from, stating if cx is looking for health subsidy & plan type (Individual vs Family)</textarea>
            </div>
            <div class="evaluation">
                <label>Value</label>
                <span>Trust</span>
                <label>Score</label>
                <span>3</span>
                <div class="scores">
                    <label><input type="radio" name="score1"></input> Stated all 3 (3)</label>
                    <label><input type="radio" name="score1"></input> Stated two, out three (1)</label>
                    <label><input type="radio" name="score1"></input> Stated only the name (0)</label>
                </div>
                <label><input type="checkbox"></input> Not Applicable</label>
                <button class="add-button">+</button>
            </div>
        </div>
        <div class="question-section yellow">
            <div class="question">
                <label>Question 2</label>
                <textarea>Question details 2</textarea>
            </div>
            <div class="evaluation">
                <label>Value</label>
                <span>Trust</span>
                <label>Score</label>
                <span>20</span>
                <div class="scores">
                    <label><input type="radio" name="score2"></input> Excellent (20)</label>
                    <label><input type="radio" name="score2"></input> Good (10)</label>
                    <label><input type="radio" name="score2"></input> Poor (5)</label>
                </div>
                <label><input type="checkbox"></input> Not Applicable</label>
                <button class="add-button">+</button>
            </div>
        </div>
        <div class="question-section green">
            <div class="question">
                <label>Question 3</label>
                <textarea>Question details 3</textarea>
            </div>
            <div class="evaluation">
                <label>Value</label>
                <span>Trust</span>
                <label>Score</label>
                <span>20</span>
                <div class="scores">
                    <label><input type="radio" name="score3"></input> Excellent (20)</label>
                    <label><input type="radio" name="score3"></input> Good (10)</label>
                    <label><input type="radio" name="score3"></input> Poor (0)</label>
                    <label><input type="radio" name="score3"></input> NA (10)</label>
                </div>
                <label><input type="checkbox"></input> Not Applicable</label>
                <button class="add-button">+</button>
            </div>
        </div>
    </div>
  </div>;
};

export default ResultsPage;
