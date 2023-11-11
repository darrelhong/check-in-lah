package main

import (
	"errors"
	"log"
	"time"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

func main() {
	app := pocketbase.New()

	// validate time before creating check_in record
	app.OnRecordBeforeCreateRequest("check_in").Add(func(e *core.RecordCreateEvent) error {
		log.Println("record before create check_in")

		timePeriodStr, ok := apis.RequestInfo(e.HttpContext).Data["time_period_str"].(string)

		if !ok {
			return nil
		}

		timePeriod, err := time.Parse("01/02/2006, 3:04:05 pm GMT-07:00", timePeriodStr)

		if err != nil {
			log.Println("time parse error", err)
			return err
		}

		log.Println("parsed timePeriod", timePeriod)

		if (time.Since(timePeriod)) > (time.Minute * 15) {
			return errors.New("invalid qr code")
		}

		log.Println(e.Record)
		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
