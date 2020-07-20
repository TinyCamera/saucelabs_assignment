# Saucelabs assignment

This is my assignment for Saucelabs. I have created a very simple service that will moniter a web server and log health metrics both to the console and to a log file.

To run this health metrics service, run "npm start".

# Solution
My solution was to periodically make a request to the web server and return health metrics. The last 100 requests are cached by default, insights are calculated based on the requests in this cache. 

My metrics service uses a traffic light system to determine the health of the system under test.

"GREEN" - no recent failures.
"AMBER" - at least 1 recent failure.
"RED" - 100% recent failures, service is likely down.

Other information logged includes the percentage of requests that failed and the top reason for failure.

I created several sub services to implement this solution and to ensure code clarity. MagnificentService makes the request to the webserver. MetricsService collects the results, saves them and returns health information. FileLoggingService is responsible for writing each metrics insight to a log file.

# What I didn't get done, but would have liked to
Due to time constaints, I was not able to complete testing. However, as I have split the code into smaller atomic services, I feel unit testing would be trivial. More sophisticated integration testing could be implemented by mocking the MagnificentService and asserting correct results in the output logfile. 

With a little more effort, my solution could be parametised in a number of different ways. It could test any url/webservice, could even calculate metrics over a much larger period of time or modify polling frequency. 


I'm keen to talk more about my solution, so if you have any other questions, please reach out.
