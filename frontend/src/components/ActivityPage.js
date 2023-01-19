import React from "react";

function ActivityPage() {
  return (
    <>
      <h3 className="mt-3 text-center">Exercise Tracker App</h3>
      <form>
        <div class="form-group">
          <label for="exampleFormControlInput1">Time Duration</label>
          <input
            type="number"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="number"
          />
        </div>
        <br />
        <div class="form-group">
        <label class="control-label" for="date">Date</label>
        <input class="form-control" id="date" name="date" placeholder="MM/DD/YYY" type="text"/>
      </div>
      <br />
        <div class="form-group">
          <label for="exampleFormControlSelect1">Example select</label>
          <select class="form-control" id="exampleFormControlSelect1">
            <option>Running</option>
            <option>Jumping</option>
            <option>Pushups</option>
            <option>Pull-ups</option>
            <option>Swimming</option>
          </select>
        </div>
        <br />
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Comments</label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
        <br />
        <button style={{
              marginLeft: 550,
            }} type="button" class="btn btn-primary">Create Activity</button>
      </form>
    </>
  );
}

export default ActivityPage;
