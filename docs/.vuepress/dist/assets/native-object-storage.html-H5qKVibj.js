import{_ as d,r as n,o as r,c,d as a,w as t,b as s,a as e,e as u}from"./app-3m32EHlS.js";const p={},v=e("h1",{id:"query-data-stored-in-object-storage",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#query-data-stored-in-object-storage","aria-hidden":"true"},"#"),s(" Query data stored in object storage")],-1),m=u(`<h2 id="overview" tabindex="-1"><a class="header-anchor" href="#overview" aria-hidden="true">#</a> Overview</h2><p>Native Object Storage (NOS) is a Vantage feature that allows you to query data stored in files in object storage such as AWS S3, Google GCS, Azure Blob or on-prem implementations. It&#39;s useful in scenarios where you want to explore data without building a data pipeline to bring it into Vantage.</p><h2 id="prerequisites" tabindex="-1"><a class="header-anchor" href="#prerequisites" aria-hidden="true">#</a> Prerequisites</h2><p>You need access to a Teradata Vantage instance. NOS is enabled in all Vantage editions from Vantage Express through Developer, DYI to Vantage as a Service starting from version 17.10.</p><p>include::ROOT:partial$vantage.express.options.adoc[]</p><h2 id="explore-data-with-nos" tabindex="-1"><a class="header-anchor" href="#explore-data-with-nos" aria-hidden="true">#</a> Explore data with NOS</h2><p>NOTE: Currently, NOS supports CSV, JSON (as array or new-line delimited), and Parquet data formats.</p><p>Let&#39;s say you have a dataset stored as CSV files in an S3 bucket. You want to explore the dataset before you decide if you want to bring it into Vantage. For this scenario, we are going to use a public dataset published by Teradata that contains river flow data collected by the U.S. Geological Survey. The bucket is at https://td-usgs-public.s3.amazonaws.com/.</p><p>Let&#39;s first have a look at sample CSV data. We take the first 10 rows that Vantage will fetch from the bucket:</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span>
  <span class="token keyword">TOP</span> <span class="token number">10</span> <span class="token operator">*</span>
<span class="token keyword">FROM</span> <span class="token punctuation">(</span>
	LOCATION<span class="token operator">=</span><span class="token string">&#39;/s3/td-usgs-public.s3.amazonaws.com/CSVDATA/&#39;</span>
<span class="token punctuation">)</span> <span class="token keyword">AS</span> d<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Here is what I&#39;ve got:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GageHeight2 Flow   site_no datetime         Precipitation GageHeight
----------- ----- -------- ---------------- ------------- -----------
10.9        15300 09380000 2018-06-28 00:30 671           9.80
10.8        14500 09380000 2018-06-28 01:00 673           9.64
10.7        14100 09380000 2018-06-28 01:15 672           9.56
11.0        16200 09380000 2018-06-27 00:00 669           9.97
10.9        15700 09380000 2018-06-27 00:30 668           9.88
10.8        15400 09380000 2018-06-27 00:45 672           9.82
10.8        15100 09380000 2018-06-27 01:00 672           9.77
10.8        14700 09380000 2018-06-27 01:15 672           9.68
10.9        16000 09380000 2018-06-27 00:15 668           9.93
10.8        14900 09380000 2018-06-28 00:45 672           9.72
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We have got plenty of numbers, but what do they mean? To answer this question, we will ask Vantage to detect the schema of the CSV files:</p><p>[source, teradata-sql]</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT
  *
FROM (
	LOCATION=&#39;/s3/td-usgs-public.s3.amazonaws.com/CSVDATA/&#39;
	RETURNTYPE=&#39;NOSREAD_SCHEMA&#39;
) AS d;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Vantage will now fetch a data sample to analyze the schema and return results:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Name            Datatype                            FileType  Location
--------------- ----------------------------------- --------- -------------------------------------------------------------------
GageHeight2     decimal(3,2)                        csv       /S3/s3.amazonaws.com/td-usgs-public/CSVDATA/09513780/2018/06/27.csv
Flow            decimal(3,2)                        csv       /S3/s3.amazonaws.com/td-usgs-public/CSVDATA/09513780/2018/06/27.csv
site_no         int                                 csv       /S3/s3.amazonaws.com/td-usgs-public/CSVDATA/09513780/2018/06/27.csv
datetime        TIMESTAMP(0) FORMAT&#39;Y4-MM-DDBHH:MI&#39; csv       /S3/s3.amazonaws.com/td-usgs-public/CSVDATA/09513780/2018/06/27.csv
Precipitation   decimal(3,2)                        csv       /S3/s3.amazonaws.com/td-usgs-public/CSVDATA/09513780/2018/06/27.csv
GageHeight      decimal(3,2)                        csv       /S3/s3.amazonaws.com/td-usgs-public/CSVDATA/09513780/2018/06/27.csv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We see that the CSV files have 6 columns. For each column, we get the name, the datatype and the file coordinates that were used to infer the schema.</p><h2 id="query-data-with-nos" tabindex="-1"><a class="header-anchor" href="#query-data-with-nos" aria-hidden="true">#</a> Query data with NOS</h2><p>Now that we know the schema, we can work with the dataset as if it was a regular SQL table. To prove the point, let&#39;s try to do some data aggregation. Let&#39;s get an average temperature per site for sites that collect temperatures.</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span>
  site_no Site_no<span class="token punctuation">,</span> <span class="token function">AVG</span><span class="token punctuation">(</span>Flow<span class="token punctuation">)</span> Avg_Flow
<span class="token keyword">FROM</span> <span class="token punctuation">(</span>
  LOCATION<span class="token operator">=</span><span class="token string">&#39;/s3/td-usgs-public.s3.amazonaws.com/CSVDATA/&#39;</span>
<span class="token punctuation">)</span> <span class="token keyword">AS</span> d
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span>
  site_no
<span class="token keyword">HAVING</span>
  Avg_Flow <span class="token operator">IS</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Result:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Site_no  Avg_Flow
-------- ---------
09380000 11
09423560 73
09424900 93
09429070 81
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>To register your ad hoc exploratory activity as a permanent source, create it as a foreign table:</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- If you are running this sample as dbc user you will not have permissions</span>
<span class="token comment">-- to create a table in dbc database. Instead, create a new database and use</span>
<span class="token comment">-- the newly create database to create a foreign table.</span>

<span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> Riverflow
  <span class="token keyword">AS</span> PERMANENT <span class="token operator">=</span> <span class="token number">60</span>e6<span class="token punctuation">,</span> <span class="token comment">-- 60MB</span>
  SPOOL <span class="token operator">=</span> <span class="token number">120</span>e6<span class="token punctuation">;</span> <span class="token comment">-- 120MB</span>

<span class="token comment">-- change current database to Riverflow</span>
<span class="token keyword">DATABASE</span> Riverflow<span class="token punctuation">;</span>

<span class="token keyword">CREATE</span> <span class="token keyword">FOREIGN</span> <span class="token keyword">TABLE</span> riverflow
  <span class="token keyword">USING</span> <span class="token punctuation">(</span> LOCATION<span class="token punctuation">(</span><span class="token string">&#39;/s3/td-usgs-public.s3.amazonaws.com/CSVDATA/&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">SELECT</span> <span class="token keyword">top</span> <span class="token number">10</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> riverflow<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Result:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Location                                                            GageHeight2 Flow site_no datetime            Precipitation GageHeight
------------------------------------------------------------------- ----------- ---- ------- ------------------- ------------- ----------
/S3/s3.amazonaws.com/td-usgs-public/CSVDATA/09429070/2018/07/02.csv null        null 9429070 2018-07-02 14:40:00 1.21          null
/S3/s3.amazonaws.com/td-usgs-public/CSVDATA/09400815/2018/07/10.csv null        0.00 9400815 2018-07-10 00:30:00 0.00          -0.01
/S3/s3.amazonaws.com/td-usgs-public/CSVDATA/09400815/2018/07/10.csv null        0.00 9400815 2018-07-10 00:45:00 0.00          -0.01
/S3/s3.amazonaws.com/td-usgs-public/CSVDATA/09400815/2018/07/10.csv null        0.00 9400815 2018-07-10 01:00:00 0.00          -0.01
/S3/s3.amazonaws.com/td-usgs-public/CSVDATA/09400815/2018/07/10.csv null        0.00 9400815 2018-07-10 00:15:00 0.00          -0.01
/S3/s3.amazonaws.com/td-usgs-public/CSVDATA/09429070/2018/07/02.csv null        null 9429070 2018-07-02 14:38:00 1.06          null
----


This time, the \`SELECT\` statement looks like a regular select against an in-database table. If you require subsecond response time when querying the data, there is an easy way to bring the CSV data into Vantage to speed things up. Read on to find out how.

## Load data from NOS into Vantage

Querying object storage takes time. What if you decided that the data looks interesting and you want to do some more analysis with a solution that will you quicker answers? The good news is that data returned with NOS can be used as a source for \`CREATE TABLE\` statements. Assuming you have \`CREATE TABLE\` privilege, you will be able to run:

IMPORTANT: This query assumes you created database \`Riverflow\` and a foreign table called \`riverflow\` in the previous step.

\`\`\`sql

-- This query assumes you created database \`Riverflow\`
-- and a foreign table called \`riverflow\` in the previous step.

CREATE MULTISET TABLE riverflow_native (site_no, Flow, GageHeight, datetime)
AS (
  SELECT site_no, Flow, GageHeight, datetime FROM riverflow
) WITH DATA
NO PRIMARY INDEX;

SELECT TOP 10 * FROM riverflow_native;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Result:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>site_no   Flow  GageHeight  datetime
-------  -----  ----------  -------------------
9400815    .00        -.01  2018-07-10 00:30:00
9400815    .00        -.01  2018-07-10 01:00:00
9400815    .00        -.01  2018-07-10 01:15:00
9400815    .00        -.01  2018-07-10 01:30:00
9400815    .00        -.01  2018-07-10 02:00:00
9400815    .00        -.01  2018-07-10 02:15:00
9400815    .00        -.01  2018-07-10 01:45:00
9400815    .00        -.01  2018-07-10 00:45:00
9400815    .00        -.01  2018-07-10 00:15:00
9400815    .00        -.01  2018-07-10 00:00:00
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This time, the <code>SELECT</code> query returned in less than a second. Vantage didn&#39;t have to fetch the data from NOS. Instead, it answered using data that was already on its nodes.</p><h2 id="access-private-buckets" tabindex="-1"><a class="header-anchor" href="#access-private-buckets" aria-hidden="true">#</a> Access private buckets</h2><p>So far, we have used a public bucket. What if you have a private bucket? How do you tell Vantage what credentials it should use?</p><p>It is possible to inline your credentials directly into your query:</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span>
  <span class="token keyword">TOP</span> <span class="token number">10</span> <span class="token operator">*</span>
<span class="token keyword">FROM</span> <span class="token punctuation">(</span>
  LOCATION<span class="token operator">=</span><span class="token string">&#39;/s3/td-usgs-public.s3.amazonaws.com/CSVDATA/&#39;</span>
  <span class="token keyword">AUTHORIZATION</span><span class="token operator">=</span><span class="token string">&#39;{&quot;ACCESS_ID&quot;:&quot;&quot;,&quot;ACCESS_KEY&quot;:&quot;&quot;}&#39;</span>
<span class="token punctuation">)</span> <span class="token keyword">AS</span> d<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Entering these credentials all the time can be tedious and less secure. In Vantage, you can create an authorization object that will serve as a container for your credentials:</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">AUTHORIZATION</span> aws_authorization
  <span class="token keyword">USER</span> <span class="token string">&#39;YOUR-ACCESS-KEY-ID&#39;</span>
  PASSWORD <span class="token string">&#39;YOUR-SECRET-ACCESS-KEY&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You can then reference your authorization object when you create a foreign table:</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">FOREIGN</span> <span class="token keyword">TABLE</span> riverflow
<span class="token punctuation">,</span> EXTERNAL SECURITY aws_authorization
<span class="token keyword">USING</span> <span class="token punctuation">(</span> LOCATION<span class="token punctuation">(</span><span class="token string">&#39;/s3/td-usgs-public.s3.amazonaws.com/CSVDATA/&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="export-data-from-vantage-to-object-storage" tabindex="-1"><a class="header-anchor" href="#export-data-from-vantage-to-object-storage" aria-hidden="true">#</a> Export data from Vantage to object storage</h2><p>So far, we have talked about reading and importing data from object storage. Wouldn&#39;t it be nice if we had a way to use SQL to export data from Vantage to object storage? This is exactly what <code>WRITE_NOS</code> function is for. Let&#39;s say we want to export data from <code>riverflow_native</code> table to object storage. You can do so with the following query:</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> WRITE_NOS <span class="token punctuation">(</span>
  <span class="token keyword">ON</span> <span class="token punctuation">(</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> riverflow_native <span class="token punctuation">)</span>
  <span class="token keyword">PARTITION</span> <span class="token keyword">BY</span> site_no <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> site_no
  <span class="token keyword">USING</span>
    LOCATION<span class="token punctuation">(</span><span class="token string">&#39;YOUR-OBJECT-STORE-URI&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">AUTHORIZATION</span><span class="token punctuation">(</span>aws_authorization<span class="token punctuation">)</span>
    STOREDAS<span class="token punctuation">(</span><span class="token string">&#39;PARQUET&#39;</span><span class="token punctuation">)</span>
    COMPRESSION<span class="token punctuation">(</span><span class="token string">&#39;SNAPPY&#39;</span><span class="token punctuation">)</span>
    NAMING<span class="token punctuation">(</span><span class="token string">&#39;RANGE&#39;</span><span class="token punctuation">)</span>
    INCLUDE_ORDERING<span class="token punctuation">(</span><span class="token string">&#39;TRUE&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">AS</span> d<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Here, we instruct Vantage to take data from <code>riverflow_native</code> and save it in <code>YOUR-OBJECT-STORE-URI</code> bucket using <code>parquet</code> format. The data will be split into files by <code>site_no</code> attribute. The files will be compressed.</p><h2 id="summary" tabindex="-1"><a class="header-anchor" href="#summary" aria-hidden="true">#</a> Summary</h2><p>In this quick start we have learned how to read data from object storage using Native Object Storage (NOS) functionality in Vantage. NOS supports reading and importing data stored in CSV, JSON and Parquet formats. NOS can also export data from Vantage to object storage.</p><h2 id="further-reading" tabindex="-1"><a class="header-anchor" href="#further-reading" aria-hidden="true">#</a> Further reading</h2>`,45),b={href:"https://docs.teradata.com/r/2mw8ooFr~xX0EaaGFaDW8A/root",target:"_blank",rel:"noopener noreferrer"};function k(h,g){const i=n("code-block"),o=n("code-group"),l=n("ExternalLinkIcon");return r(),c("div",null,[v,a(o,null,{default:t(()=>[a(i,{title:"YARN",active:""},{default:t(()=>[s(" ```bash yarn create vuepress-site [optionalDirectoryName] ``` ")]),_:1}),a(i,{title:"NPM"},{default:t(()=>[s(" ```bash npx create-vuepress-site [optionalDirectoryName] ``` ")]),_:1})]),_:1}),m,e("ul",null,[e("li",null,[e("a",b,[s("Teradata Vantage™ - Native Object Store Getting Started Guide"),a(l)])])])])}const S=d(p,[["render",k],["__file","native-object-storage.html.vue"]]);export{S as default};
